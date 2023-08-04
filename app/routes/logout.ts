// app/routes/logout.ts

import { LoaderFunction, redirect } from "@remix-run/node";
import { session } from "~/cookies.server";

export const loader: LoaderFunction = async () => {
  return redirect("/", {
    headers: {
      "Set-Cookie": await session.serialize("", {
        expires: new Date(0),
      }),
    },
  });
};