import Product from '@/models/product';
import { dbConnect } from '@/utils/database';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();
  const products = await Product.find({
    userID: params.id,
  });
  //console.log(products);
  return new Response(JSON.stringify(products), { status: 200 });
}
