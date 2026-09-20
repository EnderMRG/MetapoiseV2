import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email address is required.' },
        { status: 400 }
      );
    }

    // Configure the transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // Send the email
    const info = await transporter.sendMail({
      from: `"Metapoise V2.0" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to METAPOISE V2.0 - Secure Token',
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:40px 20px;background:#8b83ab;font-family:'Courier New',Courier,monospace;">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border:4px solid #000;background:#fff;box-shadow:8px 8px 0 #000;">

    <!-- HEADER -->
    <tr>
      <td style="padding:20px 24px;border-bottom:3px solid #000;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <img src="https://raw.githubusercontent.com/EnderMRG/MetapoiseV2/master/public/logo.svg" alt="Metapoise" width="32" height="32" style="display:inline-block;vertical-align:middle;margin-right:12px;" />
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
        <span style="color:#fff;font-size:11px;letter-spacing:3px;text-transform:uppercase;">SECURE ACCESS TOKEN — INVITATION CONFIRMED</span>
      </td>
    </tr>

    <!-- BODY: LEFT + RIGHT COLUMNS -->
    <tr>
      <td style="padding:0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr valign="top">

            <!-- LEFT COLUMN -->
            <td width="62%" style="padding:24px;border-right:3px solid #000;">
              <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;">RECIPIENT</p>
              <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${email}</p>
              <hr style="border:none;border-top:2px solid #000;margin:0 0 16px 0;" />
              <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;">HOST / ORGANIZER</p>
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;text-transform:uppercase;">METAPOISE & DUIET</p>
              <p style="margin:0 0 20px 0;font-size:12px;font-weight:700;text-transform:uppercase;">DURATION: OCT 30 — NOV 01</p>
              <hr style="border:none;border-top:2px solid #000;margin:0 0 16px 0;" />
              <p style="margin:0 0 20px 0;font-size:13px;font-weight:700;line-height:1.6;text-transform:uppercase;">
                AN EXPERIMENTAL CONVERGENCE OF NEURAL ARCHITECTURE, SYNTHETIC BIOLOGY, AND DECENTRALIZED PROTOCOLS. YOU HAVE BEEN GRANTED ENTRY.
              </p>

              <!-- TAGS -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-right:8px;">CSE / DUIET</td>
                  <td style="width:8px;"></td>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">TECH_FEST</td>
                  <td style="width:8px;"></td>
                  <td style="border:2px solid #000;padding:4px 10px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">NO_FEE</td>
                </tr>
              </table>
            </td>

            <!-- RIGHT COLUMN -->
            <td width="38%" style="padding:0;vertical-align:top;">
              <!-- STAT 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:3px solid #000;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0;font-size:52px;font-weight:900;line-height:1;">04</p>
                    <p style="margin:6px 0 0 0;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">FLAGSHIP EVENTS</p>
                  </td>
                </tr>
              </table>
              <!-- STAT 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:3px solid #000;background:#000;">
                <tr>
                  <td style="padding:20px;text-align:center;">
                    <p style="margin:0;font-size:52px;font-weight:900;line-height:1;color:#fff;">3</p>
                    <p style="margin:6px 0 0 0;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#fff;">DAYS</p>
                  </td>
                </tr>
              </table>
              <!-- BARCODE PLACEHOLDER -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:16px;text-align:center;">
                    <img src="https://barcode.tec-it.com/barcode.ashx?data=MP_V2_0_INVITE&code=Code128&dpi=96&unit=Min&imagetype=Png&rotation=0&color=%23000000&bgcolor=%23ffffff" alt="Invite Barcode" width="140" style="display:block;margin:0 auto;" />
                    <p style="margin:6px 0 0 0;font-size:8px;font-weight:700;letter-spacing:1px;color:#555;">SCAN TO VERIFY</p>
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
        <p style="margin:0;color:#fff;font-size:18px;font-weight:900;letter-spacing:4px;text-transform:uppercase;text-align:center;">DOWNLOAD_DIGITAL_DOSSIER</p>
      </td>
    </tr>

  </table>

  <p style="text-align:center;font-size:10px;color:#fff;margin-top:20px;letter-spacing:1px;text-transform:uppercase;opacity:0.7;">
    METAPOISE V2.0 // DEPT. OF CSE, DUIET // MP_V_2.0
  </p>
</body>
</html>
      `,
    });

    return NextResponse.json(
      { message: `Invitation successfully sent to ${email}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/invite:', error);
    return NextResponse.json(
      { message: 'Failed to send invitation email. Check server logs.' },
      { status: 500 }
    );
  }
}
