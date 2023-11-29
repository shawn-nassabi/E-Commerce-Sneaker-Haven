import Review from '@/models/review';
import Product from '@/models/product';
import { dbConnect } from '@/utils/database';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  const { id } = params;
  const { userName, rating, review } = await request.json();
  await dbConnect();
  const newReview = await Review.create({ userName, rating, review });
  const res = await Product.findByIdAndUpdate(id, {
    $push: { reviews: newReview },
  });
  console.log(res);
  return NextResponse.json({ message: 'Product updated' }, { status: 200 });
}
