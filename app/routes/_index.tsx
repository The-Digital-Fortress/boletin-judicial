import type { V2_MetaFunction } from '@remix-run/react'
import Navbar from '~/components/Navbar'
import Hero from '~/components/Hero'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Expediente Legal' }]
}

export default function Index() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <Hero />
    </div>
  )
}
