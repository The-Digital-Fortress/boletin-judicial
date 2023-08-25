import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node' // or cloudflare/deno
import styles from './tailwind.css'
import { json } from '@remix-run/node'
import Notification from './components/Notification'
import { NotificationProvider } from './context/notificationContext'

export async function loader() {
  return json({
    ENV: {
      REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    },
  })
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <NotificationProvider>
          <Outlet />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Notification />
        </NotificationProvider>
      </body>
    </html>
  )
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
]
