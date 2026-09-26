import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ADMIN_PASSWORD = 'metapoiseadmin';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
    }

    const csvPath = path.join(process.cwd(), 'alumni_data.csv');
    
    try {
      const data = await fs.readFile(csvPath, 'utf8');
      
      // Basic CSV parsing
      const rows = data.trim().split('\n').map(line => {
        // Strip quotes and split by comma
        const [name, email, phone, year] = line.split('\",\"').map(s => s.replace(/(^\"|\"$)/g, ''));
        // Backward compatibility: If no phone was recorded, 'year' might end up in 'phone'.
        if (year === undefined && phone) {
          return { name, email, phone: '', year: phone };
        }
        return { name, email, phone, year };
      });

      return NextResponse.json({ data: rows });
    } catch (err: any) {
      // If file doesn't exist, return empty array
      if (err.code === 'ENOENT') {
        return NextResponse.json({ data: [] });
      }
      throw err;
    }
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
