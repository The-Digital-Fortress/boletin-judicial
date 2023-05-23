import type { V2_MetaFunction } from "@remix-run/react";
import Example from "~/components/Navbar";
import Hero from "~/components/Hero";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <Example />
      <Hero />
    </div >
  );
}
