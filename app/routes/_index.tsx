import type { MetaFunction } from "@remix-run/cloudflare";
import Navbar from '~/components/Navbar'
import Hero from '~/components/Hero'

export const meta: MetaFunction = () => {
  return [
    { title: "Expediente Legal" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <Hero />
    </div>
  )
}
