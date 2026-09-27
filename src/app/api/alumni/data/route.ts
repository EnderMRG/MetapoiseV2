import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const ADMIN_PASSWORD = 'metapoiseadmin';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });

      const sheets = google.sheets({ auth, version: 'v4' });
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (!spreadsheetId || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        return NextResponse.json({ data: [] });
      }

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Alumni!A:D', // Fetching Name, Email, Phone, Year
      });

      const rows = response.data.values || [];
      
      const formattedData = rows.map(row => {
        return {
          name: row[0] || '',
          email: row[1] || '',
          phone: row[2] || '',
          year: row[3] || '',
        };
      });

      return NextResponse.json({ data: formattedData, spreadsheetId });
    } catch (err: any) {
      console.error("Error fetching Google Sheets data:", err);
      // Return empty array on error so admin panel doesn't completely crash
      return NextResponse.json({ data: [] });
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
