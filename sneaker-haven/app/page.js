import { redirect } from 'next/navigation'

export default function Root() {
  return <>{redirect('/shop')}</>
}
