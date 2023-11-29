'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ id }) {
  const [name, setName] = useState('');
  const [newRating, setNewRating] = useState('');
  const [newReview, setNewReview] = useState('');
  const router = useRouter();

  const handleRatingChange = (e) => {
    setNewRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !newRating || !newReview) {
      alert('Please input all fields for the review');
      return;
    }
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userName: name,
        rating: newRating,
        review: newReview,
      }),
    });
    if (res.ok) {
      router.push(`/shop`);
    }
  };
  return (
    <div className="flex justify-center w-[600px] h-[500px] bg-gray-100 text-lg mx-auto my-4 rounded-xl">
      <form className="block" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mt-8 text-center">LEAVE A REVIEW:</h1>
        <div className="my-8">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="mx-4 w-[400px] h-[40px] rounded-md p-2"
          />
        </div>
        <div className="my-8">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            onChange={handleRatingChange}
            value={newRating}
            className="mx-4 w-[400px] h-[40px] rounded-md p-2"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
        <div className="my-8">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            onChange={(e) => setNewReview(e.target.value)}
            className="mx-4 w-[400px] h-[120px] rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-[100px] h-[40px] mt-4 mx-auto bg-black rounded-lg hover:text-[#1AA9E8] text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
