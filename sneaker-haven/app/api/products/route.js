import Product from '@/models/product';
import { dbConnect } from '@/utils/database';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, price, description, img, userID } = await request.json();
  await dbConnect();
  await Product.create({ name, price, description, img, userID, reviews: [] });
  return NextResponse.json({ message: 'New product created' }, { status: 201 });
}

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  //console.log(products);
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id');
  await dbConnect();
  try {
    await Product.findByIdAndDelete(id);
    console.log('ITEM DELETED');
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    console.log('ERROR DELETING' + error);
    return NextResponse.json({ message: 'Error' + error }, { status: 501 });
  }
}
