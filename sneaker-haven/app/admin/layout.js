import Nav from '@/components/Nav';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';

const routeList = [
  {
    name: 'MY LISTINGS',
    route: '/admin',
  },
  {
    name: 'NEW LISTING',
    route: '/admin/create',
  },
  {
    name: 'MARKETPLACE HOME',
    route: '/shop',
  },
];

export default async function AdminLayout({ children }) {
  const user = await currentUser();

  return (
    <html lang="en">
      <body>
        <div className="block text-center">
          <h1 className={`text-[#1AA9E8] text-[50px] font-bold  py-3`}>
            SNEAKER HAVEN <span className="text-black"> ADMIN</span>
          </h1>
          <div className="w-20 ml-auto mr-8">
            <div className="flex justify-center">
              <UserButton afterSignOutUrl="/shop" />
              <h1 className="my-auto mx-2">{user.firstName}</h1>
            </div>
          </div>

          <Nav routes={routeList} />
        </div>
        {children}
      </body>
    </html>
  );
}
