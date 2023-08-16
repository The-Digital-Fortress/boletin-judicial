// Path: app/routes/profile.tsx

import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Profile from "~/components/Profile";
import { routesLoader } from '~/loader'

export { routesLoader as loader };

export default function Perfil() {
  // Get the user from the loader
  const user = useLoaderData();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <Profile user={user} />
    </div>
  );
}
