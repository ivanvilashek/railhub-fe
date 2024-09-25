import {
  ACCESS_TOKEN,
  privateRoutes,
  publicRoutes,
  REFRESH_TOKEN,
  Routes,
} from '@app/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value

  const pathname = req.nextUrl.pathname as Routes

  if (privateRoutes.includes(pathname) && !refreshToken) {
    //Clear cookies and redirect to login page
    return NextResponse.redirect(new URL(Routes.SIGN_IN, req.url))
  }

  // Redirect to dashboard if trying to access authentication-related routes
  if (refreshToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(Routes.SCHEDULES, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
