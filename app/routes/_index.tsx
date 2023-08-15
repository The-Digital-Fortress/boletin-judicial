import type { V2_MetaFunction } from '@remix-run/react'
import Navbar from '~/components/Navbar'
import Hero from '~/components/Hero'
import { useLoaderData } from '@remix-run/react';
import { indexLoader } from '~/loader';

export { indexLoader as loader};

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
