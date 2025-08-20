import { dbConnect } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb'; 

export async function GET(request, { params }) {
  try {
    const db = await dbConnect();
      const product = await db.collection('products').findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 444 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error) {
      return NextResponse.json({ success: false, error: 'Server Error or Invalid ID' }, { status: 500 });
  }
}