'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

export default function EditForm({
  id,
  name,
  price,
  description,
  img,
  userID,
}) {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);
  const [newImageUrl, setNewImageUrl] = useState(img);

  const router = useRouter();
  const { user } = useUser();

  // setNewName(name);
  // setNewPrice(price);
  // setNewDescription(description);
  // setNewImageUrl(img);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientUserID = user.id;
    // console.log(userID);
    // console.log(
    //   JSON.stringify({
    //     name: newName,
    //     price: newPrice,
    //     description: newDescription,
    //     imageUrl,
    //     userID,
    //   }),
    // );

    if (!newName || !newPrice || !newDescription || !newImageUrl) {
      alert('Please input all fields');
      return;
    }
    // Do something with the form data, e.g., send it to the server
    //console.log('Form data submitted:', { name, price, description, imageUrl });

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          description: newDescription,
          img: newImageUrl,
          userID: clientUserID,
        }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
        //redirect(process.env.URL + '/admin', 'push');
      } else {
        throw new Error('Failed to create a new product');
      }
    } catch (error) {
      console.log(error);
    }

    // Reset form fields
    setNewName('');
    setNewPrice('');
    setNewDescription('');
    setNewImageUrl('');
  };

  return (
    <div className="block text-center">
      <h1 className="mx-auto text-[40px] font-bold my-3">Edit listing:</h1>
      <div className="flex justify-center w-[600px] h-[450px] bg-gray-100 text-lg mx-auto my-4 rounded-xl">
        <form className="block my-auto" onSubmit={handleSubmit}>
          <div className="my-8">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mx-4 w-[400px] h-[40px] rounded-md p-2"
            />
          </div>
          <div className="my-8">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="mx-4 w-[400px] h-[40px] rounded-md p-2"
            />
          </div>
          <div className="my-8">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mx-4 w-[400px] h-[60px] rounded-md p-2"
            />
          </div>
          <div className="my-8">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="mx-4 w-[400px] h-[40px] rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-[100px] h-[40px] bg-black rounded-lg hover:text-[#1AA9E8] text-white font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
