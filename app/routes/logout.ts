// app/routes/logout.ts

import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
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