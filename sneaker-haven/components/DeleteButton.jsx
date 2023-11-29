'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ itemId }) {
  const router = useRouter();

  const deleteClick = async () => {
    const confirmed = confirm('Are you sure you want to delete?');
    if (confirmed) {
      try {
        const res = await fetch(`/api/products?id=${itemId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          if (res.ok) {
            router.refresh();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      onClick={deleteClick}
      className="my-auto mx-2 text-xl hover:text-[#1AA9E8]"
    >
      DELETE
    </button>
  );
}
