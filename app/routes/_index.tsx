import type { V2_MetaFunction } from '@remix-run/react'
import Navbar from '~/components/Navbar'
import Hero from '~/components/Hero'
import { useLoaderData } from '@remix-run/react'
import { session } from "~/cookies.server";
import { auth as serverAuth } from "~/firebase.server";
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get("Cookie"));

  if (!jwt) {
    return null ;
  }
  // Verify the JWT is valid
  const decoded = await serverAuth.verifySessionCookie(jwt);

  // Return user from jwt
  const user = await serverAuth.getUser(decoded.uid);

  // Return the user
  return user;
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Expediente Legal' }]
}

export default function Index() {
  const user = useLoaderData();
  return (
    <div className='flex flex-col h-screen'>
      <Navbar user={user}/>
      <Hero />
    </div>
  )
}
