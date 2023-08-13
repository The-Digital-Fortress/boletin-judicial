// app/routes/profile.tsx

import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { session } from "~/cookies.server";
import { auth as serverAuth, db as serverDb } from "~/firebase.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get("Cookie"));

  // No JWT found...
  if (!jwt) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url);
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`;
    return redirect("/login", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  // Verify the JWT is valid
  const decoded = await serverAuth.verifySessionCookie(jwt);

  // No valid JWT found...
  if (!decoded) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url);
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`;
    return redirect("/login", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  // Return user from jwt
  const user = await serverAuth.getUser(decoded.uid);
  const usersRef = serverDb.collection('users');
  const userExist = await usersRef.where('uid', '=', user.uid).limit(1).get();
  // const snapshot = await serverDb.collection('users').get();
  // snapshot.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });
  if (userExist.empty) {
    console.log('No matching documents.');
  } else {
    userExist.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }
  // Return the user
  return user;

};

export default function ProfileExample() {
  // Get the user from the loader
  const profile = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Profile Test</h1>
      {/* print the username */}
      <p>{profile.displayName}</p>
      <p>{profile.email}</p>
      <img src={profile.photoURL} alt={profile.displayName} />
    </div>
  );
}
