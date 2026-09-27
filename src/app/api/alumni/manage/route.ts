import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const ADMIN_PASSWORD = 'metapoiseadmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action, data } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
       return NextResponse.json({ error: 'Spreadsheet ID not found' }, { status: 500 });
    }

    if (action === 'ADD') {
      const { name, email, phone, year } = data;
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Alumni!A:E',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [name, email, phone, year, new Date().toISOString()]
          ],
        },
      });
      return NextResponse.json({ success: true });
    } 
    
    if (action === 'DELETE') {
      const { index } = data;
      
      // Get the sheetId for the "Alumni" tab to use with batchUpdate
      const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
      const sheet = spreadsheet.data.sheets?.find(s => s.properties?.title === 'Alumni');
      const sheetId = sheet?.properties?.sheetId;

      if (sheetId !== undefined && typeof index === 'number') {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                deleteDimension: {
                  range: {
                    sheetId: sheetId,
                    dimension: 'ROWS',
                    startIndex: index, // Since it's 0-indexed in API, row 1 in data is index 0
                    endIndex: index + 1
                  }
                }
              }
            ]
          }
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
