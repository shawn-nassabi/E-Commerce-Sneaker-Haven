import Link from 'next/link';

export default function Nav({ routes }) {
  return (
    <div className=" flex justify-center w-screen shadow-md  h-16">
      {routes.map((r) => {
        return (
          <Link
            key={r.name}
            href={r.route}
            className="text-black text-[20px] p-4 mx-4 font-regular hover:text-[#1AA9E8]"
          >
            {r.name}
          </Link>
        );
      })}
    </div>
  );
}
