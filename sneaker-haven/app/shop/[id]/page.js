'use client';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import ReviewForm from '@/components/ReviewForm';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ProductPage({ params }) {
  const [currentProduct, setCurrentProduct] = useState({});
  const [reviewList, setReviewList] = useState([]);
  //console.log('ID HERE:', params.id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          console.log('ERROR FETCHING IN TRY');
        }
        const data = await response.json();
        const { product } = data;
        //console.log(product);
        setCurrentProduct(product);
        setReviewList([...product.reviews]);
      } catch (error) {
        console.log('Error fetching,' + error);
      }
    };
    fetchProduct();
  }, []);

  //console.log(currentProduct.reviews.length);

  //console.log(currentProduct._id);
  /*
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  userID: {
    type: String,
    required: true,
  },
});
*/
  return (
    <div className="block">
      <h1 className="text-3xl font-bold my-10 text-center">
        {currentProduct.name}
      </h1>
      <Image
        src={currentProduct.img}
        alt={currentProduct.name}
        height={400}
        width={400}
        className="mx-auto rounded-2xl border-solid mt-8"
      />
      <h1 className="text-3xl my-10 text-center">{`$${currentProduct.price}`}</h1>
      <AddToCartButton currentProduct={currentProduct} />
      <p className="text-xl my-10 text-center">{currentProduct.description}</p>
      <h1 className="text-3xl font-bold mt-20 text-center">REVIEWS:</h1>
      <div className="flex justify-center flex-wrap">
        {reviewList.length > 0 ? (
          currentProduct.reviews.map((p) => {
            return <ReviewCard reviewData={p} />;
          })
        ) : (
          <h1 className="text-black text-xl my-10">No reviews yet.</h1>
        )}
      </div>
      <ReviewForm id={params.id} />
    </div>
  );
}
