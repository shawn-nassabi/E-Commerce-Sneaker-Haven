'use client';

import { Context } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

export default function Cart() {
  const { cartItems, handleRemoveFromCart, handleAddToCart, handleCheckOut } =
    useContext(Context);
  //console.log(cartItems);

  const getTotal = () => {
    let total = cartItems.reduce((prevTotal, i) => {
      return prevTotal + parseFloat(i.productType.price) * i.count;
    }, 0);
    return total;
  };

  return (
    <div className="block">
      <h1 className="bg-black text-white w-fit h-fit p-3 text-2xl font-bold rounded-xl ml-12 mt-8">
        TOTAL: ${getTotal()}
      </h1>
      {cartItems && cartItems.length > 0 ? (
        <button
          onClick={handleCheckOut}
          className="bg-black text-white w-fit h-fit p-3 text-2xl font-bold rounded-xl ml-12 mt-4 hover:bg-[#1AA9E8]"
        >
          CHECKOUT
        </button>
      ) : null}
      <div className="flex justify-center flex-wrap">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => {
            return (
              <div className="block h-fit w-[400px] bg-gray-200 my-12 mx-10 p-10 border-solid rounded-2xl">
                <Image
                  src={item.productType.img}
                  alt={item.productType.name}
                  height={400}
                  width={400}
                  className="mx-auto rounded-2xl border-solid mb-4"
                />
                <Link
                  href={`/shop/${item.productType._id}`}
                  className="my-3 text-[25px] font-bold hover:text-[#1AA9E8]"
                >
                  {item.productType.name}
                </Link>
                <h2 className="my-3 text-[25px]">{`$${item.productType.price}`}</h2>
                <p>{item.productType.description}</p>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleRemoveFromCart(item.productType._id)}
                    className="text-xl font-bold  text-white w-[35px] h-[35px] bg-black p-0 my-auto mx-4 rounded-lg hover:bg-[#1AA9E8]"
                  >
                    -
                  </button>
                  <p className="my-3 text-[25px] bg-white w-[45px] h-[45px] text-center py-1 rounded-md">
                    {item.count}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item.productType)}
                    className="text-xl font-bold  text-white w-[35px] h-[35px] bg-black p-0 my-auto mx-4 rounded-lg hover:bg-[#1AA9E8]"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Cart is empty</h1>
        )}
      </div>
    </div>
  );
}
