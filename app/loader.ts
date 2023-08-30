// loader.ts
import type { LoaderFunction } from '@remix-run/node'
import { session } from '~/cookies.server'
import { auth as serverAuth } from '~/firebase.server'
import { redirect } from '@remix-run/node'
import { getFiles, getSummaryFiles, getUserData } from './utils/files'

export const indexLoader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get('Cookie'))

  if (!jwt) {
    return null
  }
  // Verify the JWT is valid
  const decoded = await serverAuth.verifySessionCookie(jwt)

  // Return user from jwt
  const user = await serverAuth.getUser(decoded.uid)

  // Return the user
  return user
}

export const routesLoader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get('Cookie'))

  // No JWT found...
  if (!jwt) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url)
    const expires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`
    return redirect('/login', {
      headers: {
        'Set-Cookie': cookie,
      },
    })
  }

  // Verify the JWT is valid
  const decoded = await serverAuth.verifySessionCookie(jwt)

  // No valid JWT found...
  if (!decoded) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url)
    const expires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`
    return redirect('/login', {
      headers: {
        'Set-Cookie': cookie,
      },
    })
  }

  // Return user from jwt
  const user = await serverAuth.getUser(decoded.uid)

  // Return the user
  return user
}

export const adminLoader: LoaderFunction = async ({ request }) => {
  // Get the cookie value (JWT)
  const jwt = await session.parse(request.headers.get('Cookie'))

  // No JWT found...
  if (!jwt) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url)
    const expires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`
    return redirect('/login', {
      headers: {
        'Set-Cookie': cookie,
      },
    })
  }

  // Verify the JWT is valid
  const decoded = await serverAuth.verifySessionCookie(jwt)

  // No valid JWT found...
  if (!decoded) {
    // Set the current page's URL in a cookie in the redirect response
    const returnUrl = encodeURIComponent(request.url)
    const expires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes expiration
    const cookie = `returnUrl=${returnUrl}; Expires=${expires.toUTCString()}; HttpOnly; Path=/;`
    return redirect('/login', {
      headers: {
        'Set-Cookie': cookie,
      },
    })
  }

  // Return user from jwt
  const user = await serverAuth.getUser(decoded.uid)
  const userData = await getUserData(user)
  const files = await getFiles(user)
  const summaryFiles = await getSummaryFiles(user)

  // Return the user
  return { user, userData, files, summaryFiles }
}
