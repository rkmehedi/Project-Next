import { dbConnect } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { auth } from '@/../auth';

export async function GET() {
  try {
    const db = await dbConnect();
    const products = await db.collection('products').find({}).toArray();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
     console.error("🔥 API ERROR:", error); 
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await dbConnect();
    const body = await request.json();
    const result = await db.collection('products').insertOne(body);
    const newProduct = { ...body, _id: result.insertedId };
    
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}