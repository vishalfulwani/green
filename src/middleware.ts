import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
 
// export { default } from "next-auth/middleware"
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl

    const { pathname, origin } = new URL(request.url);
  if (
      token &&
      (pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname === "/" ||
        pathname.startsWith("/verify"))
    ) {
      // return NextResponse.redirect(new URL("/home", origin).toString());
    }
    
    // if (!token && url.pathname.startsWith('/home')){
    //     return NextResponse.redirect(new URL("/signin", origin).toString());
    // }

    if (token?.role !== "admin" &&
      (pathname.startsWith('/admin')) ||
      (pathname.startsWith('/admin-ptoducts')) || 
      (pathname.startsWith('/admin-sponsors'))
    ){
      return NextResponse.redirect(new URL("/", origin).toString());
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
    ]
}
