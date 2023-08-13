// app/routes/login.tsx

import type { SyntheticEvent } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Use signInWithPopup and import GoogleAuthProvider
import { auth as clientAuth } from "~/firebase.client";
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { auth as serverAuth, db as serverDb } from "~/firebase.server";
import { useFetcher } from '@remix-run/react'
import { session } from '~/cookies.server'
import GoogleLogin from '~/components/GoogleLogin'
import Navbar from "~/components/Navbar";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get("idToken")?.toString();

  // Verify the idToken is actually valid
  await serverAuth.verifyIdToken(idToken);

  const jwt = await serverAuth.createSessionCookie(idToken, {
    // 5 days - can be up to 2 weeks
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });

  //FIRESTORE
  const decoded = await serverAuth.verifySessionCookie(jwt);
  const user = await serverAuth.getUser(decoded.uid);
  const usersRef = serverDb.collection('users');
  const userExist = await usersRef.where('uid', '=', user.uid).limit(1).get();
  
  if (userExist.empty) {
    usersRef.doc().set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      createdOn: new Date(),
      expirationDate: new Date(Date.now() + 60 * 60 * 24 * 5 * 1000),
      status: 'trial',
    });
  }

  // Get the returnUrl cookie directly from the request headers
  const returnUrlCookie = request.headers.get("Cookie")?.split("; ").find(cookie => cookie.startsWith("returnUrl="));

  // Extract the returnUrl from the cookie and decode it back to its original format
  const returnUrl = returnUrlCookie ? decodeURIComponent(returnUrlCookie.split("=")[1]) : '/';


    return redirect(returnUrl, {
      headers: {
        "Set-Cookie": await session.serialize(jwt),
      },
    });
}

export default function Login({ location }: { location: string }) {
  const fetcher = useFetcher();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(clientAuth, provider);
      const idToken = await credential.user.getIdToken();
      // Get the current page URL
      const returnUrl = encodeURIComponent(location);
      // Trigger a POST request which the action will handle
      fetcher.submit({ idToken, returnUrl }, { method: "post", action: "/login" });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={null}/>
      <GoogleLogin handleClick={handleSubmit} />
    </div>
  )
}
