import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { name, email, phone, year } = await request.json();

    if (!name || !email || !phone || !year) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (parseInt(year) >= 2026) {
      return NextResponse.json({ error: 'Year of graduation must be less than 2026' }, { status: 400 });
    }

    // 1. Save to Google Sheets
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });

      const sheets = google.sheets({ auth, version: 'v4' });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (spreadsheetId && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Alumni!A:E', // IMPORTANT: Create a tab named "Alumni" in your Google Sheet!
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [name, email, phone, year, new Date().toISOString()]
            ],
          },
        });
      }
    } catch (sheetError) {
      console.error("Failed to save to Google Sheets:", sheetError);
    }

    // 2. Send Email
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    
    if (user && pass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass }
      });

      const mailOptions = {
        from: `"Moharnab from Metapoise" <${user}>`,
        to: email,
        replyTo: user,
        subject: `METAPOISE V2.0 - Alumni Registration Confirmed for ${name}`,
        text: `Hello ${name},\n\nYour registration as an Alumni Delegate for METAPOISE V2.0 has been authenticated.\n\nREGISTRATION DETAILS:\nAttendee: ${name}\nGraduation Class: ${year}\nPhone: ${phone}\nHost: Department of Computer Science & Engineering, DUIET & Metapoise\nDates: October 30 — November 01, 2026\nVenue: Dept. of CSE, DUIET, Dibrugarh University\n\nWe look forward to welcoming you home to DUIET.\n\nWarm regards,\nAlumni Relations Committee\nMETAPOISE V2.0\nDepartment of Computer Science & Engineering, DUIET\nDibrugarh University, Assam 786004, India`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Alumni Registration Confirmed</title>
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
                      Alumni Homecoming • Department of CSE, DUIET
                    </p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #1e293b; color: #38bdf8; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; border: 1px solid #334155;">
                      CLASS OF ${year}
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
                Alumni Registration Confirmed
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                Welcome <strong>${name}</strong>, your alumni delegate registration for METAPOISE V2.0 has been successfully recorded in the department alumni directory.
              </p>

              <!-- Details Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                      <tr>
                        <td width="35%" style="padding: 6px 0; color: #64748b; font-weight: 600;">Alumnus Name:</td>
                        <td width="65%" style="padding: 6px 0; color: #0f172a; font-weight: 700;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Class of:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${year}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Contact Phone:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${phone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Registered Email:</td>
                        <td style="padding: 6px 0; color: #0f172a;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Symposium Dates:</td>
                        <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">October 30 — November 01, 2026</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Venue:</td>
                        <td style="padding: 6px 0; color: #0f172a;">Dept. of CSE, DUIET, Dibrugarh University</td>
                      </tr>
                    </table>

                    <!-- Pure HTML/CSS Ticket Pass (Zero external tracker calls) -->
                    <div style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed #cbd5e1; text-align: center;">
                      <div style="display: inline-block; padding: 6px 14px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px;">
                        <span style="font-family: monospace; font-size: 13px; font-weight: 700; letter-spacing: 3px; color: #0f172a;">
                          ||| | |||| | || |||| | |||
                        </span>
                        <div style="font-family: monospace; font-size: 10px; color: #64748b; letter-spacing: 2px; margin-top: 2px;">
                          ALUMNI-${year}-${Buffer.from(email).toString('hex').slice(0, 6).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                We look forward to your valuable presence and interaction with students and faculty.
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
                This email was sent to ${email} regarding your alumni registration.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn('GMAIL_USER or GMAIL_APP_PASSWORD not set. Email not sent.');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 });
  }
}
