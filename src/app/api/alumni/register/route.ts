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
        from: user,
        to: email,
        subject: 'Connection Established - Metapoise Alumni Network',
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background-color:#1a4084;background:linear-gradient(to bottom right, #1a4084, #3b6d8e);font-family:'Courier New',Courier,monospace;">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border:4px solid #000;background:#fff;box-shadow:8px 8px 0 #000;">

    <!-- HEADER -->
    <tr>
      <td style="padding:20px 24px;border-bottom:3px solid #000;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:2px;">METAPOISE V2.0</span>
            </td>
            <td align="right">
              <span style="border:2px solid #000;padding:4px 8px;font-weight:900;font-size:14px;">[X]</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SUBHEADER -->
    <tr>
      <td style="padding:14px 24px;border-bottom:3px solid #000;background:#000;">
        <span style="color:#fff;font-size:11px;letter-spacing:3px;text-transform:uppercase;">ALUMNI NODE REGISTRATION — CONFIRMED</span>
      </td>
    </tr>

    <!-- BODY: LEFT + RIGHT COLUMNS -->
    <tr>
      <td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr valign="top">

            <!-- LEFT COLUMN -->
            <td width="62%" style="padding:24px;border-right:3px solid #000;">
              <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;">ALIAS / RECIPIENT</p>
              <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${name}</p>
              <hr style="border:none;border-top:2px solid #000;margin:0 0 16px 0;" />
              <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;">SECURE LINE (PHONE)</p>
              <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${phone}</p>
              <hr style="border:none;border-top:2px solid #000;margin:0 0 16px 0;" />
              <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;">HOST / ORGANIZER</p>
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;text-transform:uppercase;">METAPOISE & DUIET</p>
              <p style="margin:0 0 20px 0;font-size:12px;font-weight:700;text-transform:uppercase;">DATE: OCT 15, 2026</p>
              <hr style="border:none;border-top:2px solid #000;margin:0 0 16px 0;" />
              <p style="margin:0 0 20px 0;font-size:13px;font-weight:700;line-height:1.6;text-transform:uppercase;">
                YOUR REGISTRATION AS AN ALUMNI NODE HAS BEEN SUCCESSFULLY AUTHENTICATED. WE AWAIT YOUR ARRIVAL AT THE SYMPOSIUM.
              </p>

              <!-- TAGS -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-right:8px;">ALUMNI</td>
                  <td style="width:8px;"></td>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">CLASS_${year}</td>
                  <td style="width:8px;"></td>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">VERIFIED</td>
                </tr>
              </table>
            </td>

            <!-- RIGHT COLUMN -->
            <td width="38%" style="padding:0;vertical-align:top;">
              <!-- STAT 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:3px solid #000;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0;font-size:48px;font-weight:900;line-height:1;">${year}</p>
                    <p style="margin:6px 0 0 0;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">GRADUATION YEAR</p>
                  </td>
                </tr>
              </table>
              <!-- STAT 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:3px solid #000;background:#000;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0;font-size:42px;font-weight:900;line-height:1;color:#fff;">V2.0</p>
                    <p style="margin:6px 0 0 0;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#fff;">ACCESS GRANTED</p>
                  </td>
                </tr>
              </table>
              <!-- BARCODE PLACEHOLDER -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px;text-align:center;">
                    <img src="https://barcode.tec-it.com/barcode.ashx?data=ALUMNI_${year}&code=Code128&dpi=96&unit=Min&imagetype=Png&rotation=0&color=%23000000&bgcolor=%23ffffff" alt="Invite Barcode" width="140" style="display:block;margin:0 auto;" />
                    <p style="margin:6px 0 0 0;font-size:8px;font-weight:700;letter-spacing:1px;color:#555;">SCAN AT ENTRY</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#000;padding:20px 24px;border-top:3px solid #000;">
        <p style="margin:0;color:#fff;font-size:18px;font-weight:900;letter-spacing:4px;text-transform:uppercase;text-align:center;">CONNECTION_ESTABLISHED</p>
      </td>
    </tr>

  </table>

  <p style="text-align:center;font-size:10px;color:#fff;margin-top:20px;letter-spacing:1px;text-transform:uppercase;opacity:0.7;">
    METAPOISE V2.0 // DEPT. OF CSE, DUIET // SYSTEM_GENERATED
  </p>
</body>
</html>
        `
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
