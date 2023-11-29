import Product from '@/models/product';
import { dbConnect } from '@/utils/database';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  // const {
  //   newName: name,
  //   newPrice: price,
  //   newDescription: description,
  //   newImg: img,
  //   newUserID: userID
  // } = await request.json();
  const { name, price, description, img, userID } = await request.json();

  await dbConnect();
  await Product.findByIdAndUpdate(id, {
    name,
    price,
    description,
    img,
    userID,
  });
  return NextResponse.json({ message: 'Product updated' }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await dbConnect();
  const product = await Product.findOne({ _id: id });
  return NextResponse.json({ product }, { status: 200 });
}
