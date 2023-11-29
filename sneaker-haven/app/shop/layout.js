import '../globals.css';
import Link from 'next/link';
import Nav from '../../components/Nav.jsx';
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs';

// LIST OF ROUTES FOR
const routeList = [
  {
    name: 'MARKETPLACE',
    route: '/shop',
  },
  {
    name: 'CART',
    route: '/shop/cart',
  },
  {
    name: 'ADMIN',
    route: '/admin',
  },
];

export default async function ShopLayout({ children }) {
  const { userId } = auth();
  let userLoggedIn = false;
  if (userId) {
    console.log(userId);
    userLoggedIn = true;
  }

  const user = await currentUser();

  return (
    <html lang="en">
      <body>
        <div className="w-screen bg-white">
          <div className="mx-auto w-[500px] text-center mt-5">
            <Link
              className={`text-[#1AA9E8] text-[50px] font-bold  py-3`}
              href="/shop"
            >
              SNEAKER HAVEN
            </Link>
          </div>

          {userLoggedIn ? (
            <div className="w-20 ml-auto mr-8">
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/shop" />
                <h1 className="my-auto mx-2">{user.firstName}</h1>
              </div>
            </div>
          ) : (
            <></>
          )}

          <Nav routes={routeList} key={'shop-routes'} />
        </div>
        {children}
      </body>
    </html>
  );
}
