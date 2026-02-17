import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/gold-price.json');
    
    if (!fs.existsSync(filePath)) {
      // Fallback if file doesn't exist
      return NextResponse.json({ price: 2000, source: 'fallback' }, { status: 200 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load gold price' }, { status: 500 });
  }
}
