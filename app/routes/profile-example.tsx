// app/routes/profile.tsx
import { useLoaderData } from "@remix-run/react";
import { routesLoader } from '~/loader'

export { routesLoader as loader };

export default function ProfileExample() {
  const user = useLoaderData();

  return (
    <div>
      <h1>Profile Test</h1>
      {/* print the username */}
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <img src={user.photoURL} alt={user.displayName} />
    </div>
  );
}
