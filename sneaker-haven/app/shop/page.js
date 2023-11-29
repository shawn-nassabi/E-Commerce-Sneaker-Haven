'use client';

import Image from 'next/image';
import { Oswald } from 'next/font/google';
import Link from 'next/link';
import Nav from '../../components/Nav.jsx';
import ProductCard from '@/components/ProductCard';

import { useState, useEffect } from 'react';

const oswald = Oswald({
  weight: '600',
  style: 'normal',
  subsets: ['latin'],
});

// some placeholder static content
const productsStatic = [
  {
    name: 'Air force 1',
    price: '100',
    description: 'White on white',
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/gsuin11ptg5qgktmzoat/nike-air-force-1-low-triple-white.jpg',
  },
  {
    name: 'Air Jordan 1 Retro High',
    price: '175',
    description: 'Chicago',
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/kj11ctakaqzca1hrkbkh/air-jordan-1-retro-chicago-release-date.jpg',
  },
  {
    name: 'Air Jordan 1 Travis',
    price: '1200',
    description: 'Mocha',
    img: 'https://phenomenalkicksrsa.com/wp-content/uploads/2023/09/image_29267d9c-f3ef-4b03-aa77-d6b35f00761c.jpg',
  },
  {
    name: 'Nike SB Dunk',
    price: '85',
    description: 'Black, gum outer-sole',
    img: 'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/b371e4dd-4c8d-4a2d-9ba0-268af8492b6f/sb-dunk-low-pro-black-and-gum-cd2563-006-release-date.jpg',
  },
];

// const getProducts = async () => {
//   try {
//     const products = await fetch('http://localhost:3000/api/products', {
//       cache: 'no-store',
//     });
//     console.log(products);
//     return products;
//   } catch (error) {
//     console.log('error');
//     return null;
//   }
// };

export default function Home() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    // getting all products
    const fetchProducts = async () => {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const data = await response.json();
      //console.log(data);
      setProductsList(data);
    };

    fetchProducts();
  }, []);
  //console.log(productsList);

  return (
    <>
      <div className="block w-screen bg-white">
        <div className="flex justify-center w-screen bg-[#1AA9E8]">
          <Image
            className="center"
            alt="shoes"
            width={600}
            height={500}
            src="https://img.buzzfeed.com/buzzfeed-static/complex/images/kbgnmxtemj18wngufiqx/ebay-sneakers.jpg?output-format=jpg&output-quality=auto"
          />
        </div>
        <div className="w-screen shadow-xl my-3 px-12 py-4">
          <h1 className={`text-black font-bold text-[26px] my-1`}>
            CURRENTLY FOR SALE:
          </h1>
        </div>
        <div className="flex flex-wrap justify-center h-fit">
          {productsList.map((p) => {
            return <ProductCard product={p} key={p.name} loggedIn={false} />;
          })}
        </div>
        <div className="h-[100px] bg-slate-100 w-screen my-5 text-center py-10">
          MADE BY SHAWN NASSABI
        </div>
      </div>
    </>
  );
}
