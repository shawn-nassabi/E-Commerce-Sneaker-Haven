'use client';

import EditForm from '@/components/EditForm';

// const getId = () => {
//   const { user } = useUser();
//   const userId = user.id;
//   //console.log(userId);
//   return userId;
// };

const getProductById = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to get');
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditProduct({ params }) {
  const { id } = params;
  const { product } = await getProductById(id);
  //console.log(product);
  const { name, price, description, img, userID } = product;

  return (
    <EditForm
      id={id}
      name={name}
      price={price}
      description={description}
      img={img}
      userID={userID}
    />
  );
}
