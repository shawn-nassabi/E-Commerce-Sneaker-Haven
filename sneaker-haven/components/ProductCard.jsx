import Image from 'next/image';
import DeleteButton from './DeleteButton';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product, loggedIn }) {
  return (
    <div className="block h-fit w-[400px] bg-gray-200 my-16 mx-10 p-10 border-solid rounded-2xl">
      <Image
        src={product.img}
        alt={product.name}
        height={400}
        width={400}
        className="mx-auto rounded-2xl border-solid mb-4"
      />
      {loggedIn ? (
        <h2 className="my-3 text-[25px] font-bold">{product.name}</h2>
      ) : (
        <Link
          href={`/shop/${product._id}`}
          className="my-3 text-[25px] font-bold hover:text-[#1AA9E8]"
        >
          {product.name}
        </Link>
      )}

      <h2 className="my-3 text-[25px]">{`$${product.price}`}</h2>
      <p>{product.description}</p>
      {!loggedIn ? <AddToCartButton currentProduct={product} /> : <></>}
      {loggedIn ? (
        <div className="flex justify-center mt-8">
          <DeleteButton itemId={product._id} />
          <Link
            href={`/admin/edit/${product._id}`}
            className="my-auto mx-2 text-xl hover:text-[#1AA9E8]"
          >
            EDIT
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
