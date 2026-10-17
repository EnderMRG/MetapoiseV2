import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      teamName,
      leaderName,
      phone,
      email,
      teamSize,
      teamMembers = [],
      institution,
      psid,
      projectDescription,
      liveLink,
      githubLink,
    } = body;

    // Validate required fields
    if (
      !teamName?.trim() ||
      !leaderName?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !institution?.trim() ||
      !psid?.trim() ||
      !projectDescription?.trim() ||
      !githubLink?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            'All primary fields (Team Name, Leader Name, Phone, Email, Institution, PSID, Project Description, GitHub Link) are required.',
        },
        { status: 400 }
      );
    }

    const numericTeamSize = Math.max(2, Math.min(4, parseInt(teamSize) || 2));

    // Validate that all team member names are provided (team size is 2, 3, or 4)
    for (let i = 0; i < numericTeamSize - 1; i++) {
      if (!teamMembers[i] || !teamMembers[i].trim()) {
        return NextResponse.json(
          {
            error: `Team Member ${i + 2} name is required for team size of ${numericTeamSize}.`,
          },
          { status: 400 }
        );
      }
    }

    const member2 = (teamMembers[0] || '').trim();
    const member3 = (teamMembers[1] || '').trim();
    const member4 = (teamMembers[2] || '').trim();

    const teamSizeLabel =
      numericTeamSize === 2 ? 'Duo' : numericTeamSize === 3 ? 'Trio' : 'Squad';

    const membersSummary = [
      `Leader: ${leaderName.trim()}`,
      member2 ? `Member 2: ${member2}` : null,
      member3 ? `Member 3: ${member3}` : null,
      member4 ? `Member 4: ${member4}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    // 1. Google Sheets Integration (Tab: hackathon)
    let sheetSaved = false;
    let sheetErrorDetails: string | null = null;

    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (spreadsheetId && clientEmail && privateKey) {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: clientEmail,
            private_key: privateKey,
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ auth, version: 'v4' });

        // Ensure "hackathon" tab exists
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetTitles = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

        const tabName = 'hackathon';
        if (!sheetTitles.includes(tabName)) {
          // Create tab
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [
                {
                  addSheet: {
                    properties: {
                      title: tabName,
                      gridProperties: {
                        frozenRowCount: 1,
                      },
                    },
                  },
                },
              ],
            },
          });

          // Insert headers
          const headers = [
            'Timestamp',
            'Team Name',
            'Team Leader Name',
            'Phone Number',
            'Email',
            'Team Size',
            'Team Members Summary',
            'Member 2 Name',
            'Member 3 Name',
            'Member 4 Name',
            'Institution',
            'PSID',
            'Project Description',
            'Live Link',
            'GitHub Repo Link',
          ];

          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `${tabName}!A1:O1`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [headers],
            },
          });
        }

        // Append submission row
        const rowData = [
          timestamp,
          teamName.trim(),
          leaderName.trim(),
          phone.trim(),
          email.trim(),
          `${numericTeamSize} (${teamSizeLabel})`,
          membersSummary,
          member2 || 'N/A',
          member3 || 'N/A',
          member4 || 'N/A',
          institution.trim(),
          psid.trim(),
          projectDescription.trim(),
          liveLink?.trim() || 'N/A',
          githubLink.trim(),
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${tabName}!A:O`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [rowData],
          },
        });

        sheetSaved = true;
      } else {
        console.warn('Google Sheets environment variables missing.');
      }
    } catch (sheetErr: any) {
      console.error('Failed to append to Google Sheets:', sheetErr);
      sheetErrorDetails = sheetErr.message || 'Sheet API error';
    }

    // 2. Local CSV Backup (safety fallback)
    try {
      const csvPath = path.join(process.cwd(), 'hackathon_data.csv');
      let fileExists = true;
      try {
        await fs.access(csvPath);
      } catch {
        fileExists = false;
      }

      const headers =
        'Timestamp,Team Name,Team Leader Name,Phone Number,Email,Team Size,Team Members Summary,Member 2,Member 3,Member 4,Institution,PSID,Project Description,Live Link,GitHub Repo Link\n';
      const escapeCsv = (val: string) => `"${(val || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const csvRow =
        [
          escapeCsv(timestamp),
          escapeCsv(teamName.trim()),
          escapeCsv(leaderName.trim()),
          escapeCsv(phone.trim()),
          escapeCsv(email.trim()),
          escapeCsv(`${numericTeamSize} (${teamSizeLabel})`),
          escapeCsv(membersSummary),
          escapeCsv(member2 || 'N/A'),
          escapeCsv(member3 || 'N/A'),
          escapeCsv(member4 || 'N/A'),
          escapeCsv(institution.trim()),
          escapeCsv(psid.trim()),
          escapeCsv(projectDescription.trim()),
          escapeCsv(liveLink?.trim() || 'N/A'),
          escapeCsv(githubLink.trim()),
        ].join(',') + '\n';

      if (!fileExists) {
        await fs.writeFile(csvPath, headers + csvRow, 'utf-8');
      } else {
        await fs.appendFile(csvPath, csvRow, 'utf-8');
      }
    } catch (csvErr) {
      console.error('Failed to append to local CSV:', csvErr);
    }

    // 3. High-Deliverability Confirmation Email Dispatch
    try {
      const user = process.env.GMAIL_USER;
      const pass = process.env.GMAIL_APP_PASSWORD;

      if (user && pass) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
        });

        // Safe URL checker to avoid spam/phishing flags from raw localhost links
        const isSafeUrl = (url?: string) => {
          if (!url) return false;
          try {
            const parsed = new URL(url);
            return (
              (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
              !parsed.hostname.includes('localhost') &&
              !parsed.hostname.includes('127.0.0.1')
            );
          } catch {
            return false;
          }
        };

        const safeGithubLink = isSafeUrl(githubLink.trim())
          ? `<a href="${githubLink.trim()}" style="color: #2563eb; text-decoration: underline; word-break: break-all;">${githubLink.trim()}</a>`
          : `<span style="word-break: break-all; color: #0f172a;">${githubLink.trim()}</span>`;

        const safeLiveLink = liveLink?.trim()
          ? isSafeUrl(liveLink.trim())
            ? `<a href="${liveLink.trim()}" style="color: #2563eb; text-decoration: underline; word-break: break-all;">${liveLink.trim()}</a>`
            : `<span style="word-break: break-all; color: #0f172a;">${liveLink.trim()}</span>`
          : null;

        const textBody = [
          `METAPOISE V2.0 - HACKATHON REGISTRATION CONFIRMED`,
          ``,
          `Hello ${leaderName.trim()},`,
          ``,
          `Your Phase 1 digital dossier for team "${teamName.trim()}" has been successfully recorded in the official METAPOISE V2.0 hackathon database.`,
          ``,
          `REGISTRATION SUMMARY:`,
          `-------------------------------------------`,
          `Team Name: ${teamName.trim()}`,
          `Team Size: ${teamSizeLabel} (${numericTeamSize} members)`,
          `Team Leader: ${leaderName.trim()} (${phone.trim()})`,
          `Roster: ${membersSummary}`,
          `Institution: ${institution.trim()}`,
          `Problem Statement (PSID): ${psid.trim()}`,
          `GitHub Repository: ${githubLink.trim()}`,
          liveLink?.trim() ? `Live Demo URL: ${liveLink.trim()}` : null,
          `Timestamp: ${timestamp}`,
          `-------------------------------------------`,
          ``,
          `NEXT STEPS:`,
          `The technical review panel is evaluating all digital dossiers. The top 15 shortlisted teams will advance to Phase 2 (On-Site Finals & Live Demo on 01 November 2026 at Department of CSE, DUIET).`,
          ``,
          `If you have questions or updates, please reply directly to this email.`,
          ``,
          `Best regards,`,
          `Technical Organizing Committee`,
          `METAPOISE V2.0 Technical Symposium`,
          `Department of Computer Science & Engineering, DUIET`,
          `Dibrugarh University, Assam 786004, India`,
        ]
          .filter(Boolean)
          .join('\n');

        const htmlBody = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hackathon Registration Confirmed</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 28px; border-bottom: 3px solid #2563eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">
                      METAPOISE V2.0
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                      Flagship Hackathon • Department of CSE, DUIET
                    </p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #1e293b; color: #38bdf8; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; border: 1px solid #334155;">
                      PHASE 1
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
                Registration Confirmed
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                Hello <strong>${leaderName.trim()}</strong>, your Phase 1 digital dossier for team <strong>${teamName.trim()}</strong> has been successfully received and logged into the official symposium database.
              </p>

              <!-- Dossier Details Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                      <tr>
                        <td width="35%" style="padding: 6px 0; color: #64748b; font-weight: 600;">Team Name:</td>
                        <td width="65%" style="padding: 6px 0; color: #0f172a; font-weight: 700;">${teamName.trim()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Team Size:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${teamSizeLabel} (${numericTeamSize} members)</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Team Leader:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${leaderName.trim()} (${phone.trim()})</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Roster:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${membersSummary}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Institution:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${institution.trim()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Selected PSID:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${psid.trim()}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">GitHub Repo:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${safeGithubLink}</td>
                      </tr>
                      ${
                        safeLiveLink
                          ? `<tr>
                              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Demo / Bench URL:</td>
                              <td style="padding: 6px 0; color: #0f172a;">${safeLiveLink}</td>
                            </tr>`
                          : ''
                      }
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Timestamp:</td>
                        <td style="padding: 6px 0; color: #64748b;">${timestamp}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Notice Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px; margin: 0 0 20px 0;">
                <tr>
                  <td style="padding: 14px 18px; font-size: 13px; color: #1e40af; line-height: 1.5;">
                    <strong>Phase 1 Evaluation:</strong> The evaluation panel is reviewing submitted digital dossiers. The top 15 shortlisted teams will be invited to Phase 2 (On-Site Finals & Live Demo on 01 November 2026 at Department of CSE, DUIET).
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                Need to update your repository or pitch deck? Simply reply directly to this email and our coordinators will assist you.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.5;">
              <p style="margin: 0 0 4px 0; font-weight: 600; color: #64748b;">
                METAPOISE V2.0 • DUIET, Dibrugarh University
              </p>
              <p style="margin: 0 0 4px 0;">
                Department of Computer Science & Engineering, Dibrugarh, Assam 786004
              </p>
              <p style="margin: 0; font-size: 11px;">
                This email was sent to ${email.trim()} regarding your hackathon registration.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const mailOptions = {
          from: `"Moharnab from Metapoise" <${user}>`,
          to: email.trim(),
          replyTo: user,
          subject: `Hackathon Registration Confirmed: Team ${teamName.trim()}`,
          text: textBody,
          html: htmlBody,
        };

        await transporter.sendMail(mailOptions);
      }
    } catch (emailErr) {
      console.warn('Confirmation email dispatch skipped or failed:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Hackathon dossier successfully logged to sheet tab "hackathon".',
      sheetSaved,
    });
  } catch (error: any) {
    console.error('Hackathon submission error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during submission.' },
      { status: 500 }
    );
  }
}
