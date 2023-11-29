'use client';
import { useRouter } from 'next/navigation';

export default function Refresh() {
  const router = useRouter();
  function handleClick() {
    router.refresh();
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="my-4 rounded-md w-[200px] h-[55px] center bg-black text-white font-bold text-[22px] hover:text-[#1AA9E8]"
      >
        REFRESH
      </button>
    </>
  );
}
