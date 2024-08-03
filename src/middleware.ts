import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
 
// export { default } from "next-auth/middleware"
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    console.log("hello",token)
    const url = request.nextUrl
    console.log(url,"urllllllllll")
    console.log("[][]{}{}",new URL(request.url),"{}[][]")

    const { pathname, origin } = new URL(request.url);
    console.log(pathname,"pathhl",origin)
  if (
      token &&
      (pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname === "/" ||
        pathname.startsWith("/verify"))
    ) {
      console.log("shiift")
      return NextResponse.redirect(new URL("/dashboard", origin).toString());
    }
    
    if (!token && url.pathname.startsWith('/dashboard')){
      console.log("shiift22222")
        return NextResponse.redirect(new URL("/signin", origin).toString());
    }
    if (token?.role !== "admin" &&
      (pathname.startsWith('/admin'))
    ){
      return NextResponse.redirect(new URL("/dashboard", origin).toString());
    }
    console.log("no shifttt")
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
