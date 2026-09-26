import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ADMIN_PASSWORD = 'metapoiseadmin';
const CSV_PATH = path.join(process.cwd(), 'alumni_data.csv');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, action, data } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    if (action === 'ADD') {
      const { name, email, phone, year } = data;
      const csvLine = `"${name}","${email}","${phone}","${year}"\n`;
      await fs.appendFile(CSV_PATH, csvLine, 'utf8');
      return NextResponse.json({ success: true });
    } 
    
    if (action === 'DELETE') {
      const { index } = data;
      
      try {
        const fileData = await fs.readFile(CSV_PATH, 'utf8');
        const rows = fileData.trim().split('\n');
        
        // Remove the specific row by index
        if (typeof index === 'number' && index >= 0 && index < rows.length) {
          rows.splice(index, 1);
        }

        // Filter out empty rows just in case
        const updatedRows = rows.filter(row => row.trim());

        // Write back
        const newContent = updatedRows.length > 0 ? updatedRows.join('\n') + '\n' : '';
        await fs.writeFile(CSV_PATH, newContent, 'utf8');
        return NextResponse.json({ success: true });
      } catch (err: any) {
        if (err.code === 'ENOENT') {
          return NextResponse.json({ success: true }); // File doesn't exist, nothing to delete
        }
        throw err;
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Operation failed' }, { status: 500 });
  }
}
