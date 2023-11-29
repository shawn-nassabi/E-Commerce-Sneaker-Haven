'use client';
import { Context } from '@/context';
import { useContext } from 'react';

export default function AddToCartButton({ currentProduct }) {
  const { handleAddToCart } = useContext(Context);
  return (
    <div className="mx-auto flex justify-center my-2">
      <button
        onClick={() => handleAddToCart(currentProduct)}
        className="my-4 rounded-md w-full max-w-[400px] h-[55px] center bg-black text-white font-bold text-[22px] hover:text-[#1AA9E8]"
      >
        ADD TO CART
      </button>
    </div>
  );
}
