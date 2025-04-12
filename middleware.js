import { NextResponse } from 'next/server'

export function middleware(request) {
  const user = request.cookies.get('user')
  const isRootPage = request.nextUrl.pathname === '/'

  if (!user && !isRootPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (user && isRootPage) {
    return NextResponse.redirect(new URL('/homepage', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
