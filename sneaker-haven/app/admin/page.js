// import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Refresh from '@/components/Refresh';
// import { useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';

// export default function AdminHome() {
//   const [productsList, setProductsList] = useState([]);

//   const { user } = useUser();
//   const userID = user?.id;

//   const router = useRouter();

//   useEffect(() => {
//     // getting all products
//     const fetchProducts = async () => {
//       const response = await fetch(`/api/users/${userID}/products`, {
//         cache: 'no-store',
//       });
//       const data = await response.json();
//       //console.log(data);
//       //setProductsList(data.filter((p) => p['userID'] === userID));
//       setProductsList(data);
//       router.push('/admin');
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <div className="block w-screen bg-white">
//         <div className="w-screen shadow-xl my-3 px-12 py-4">
//           <h1 className={`text-black font-bold text-[26px] my-1`}>
//             MY LISTINGS:
//           </h1>
//         </div>
//         <div className="flex flex-wrap justify-center h-fit">
//           {productsList.map((p) => {
//             return <ProductCard product={p} key={p.name} />;
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

async function getProducts() {
  const { userId } = auth();
  if (!userId) {
    console.log('User not logged in');
    return [];
  }
  //console.log(userId);
  //console.log(userId);
  try {
    const response = await fetch(
      process.env.URL + `/api/users/${userId}/products`,
      {
        cache: 'no-store',
      },
    );
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function AdminHome() {
  const products = await getProducts();

  return (
    <>
      <div className="block w-screen bg-white">
        <div className="flex justify-between w-screen shadow-xl my-3 px-12 py-4">
          <h1 className={`text-black font-bold text-[26px] my-auto`}>
            MY LISTINGS:
          </h1>
          <Refresh />
        </div>
        <div className="flex flex-wrap justify-center h-fit">
          {products?.map((p) => {
            return <ProductCard product={p} key={p.name} loggedIn={true} />;
          })}
        </div>
      </div>
    </>
  );
}
