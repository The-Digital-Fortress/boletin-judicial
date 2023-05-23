import type { LinksFunction } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Hero from "~/components/Hero";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Expediente Legal" }];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "https://user-images.githubusercontent.com/60411196/240128272-722a7af9-a5e7-4ae5-8d16-bbb4b650668f.png",
      type: "image/png",
    },
  ];
}

export default function Index() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Hero />
    </div >
  );
}
