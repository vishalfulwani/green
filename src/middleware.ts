// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// export { default } from "next-auth/middleware"
// import { getToken } from "next-auth/jwt"

// // export { default } from "next-auth/middleware"
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({req:request})
//     const url = request.nextUrl

//     const { pathname, origin } = new URL(request.url);
//   if (
//       token &&
//       (pathname.startsWith("/signin") ||
//         pathname.startsWith("/signup") ||
//         pathname === "/" ||
//         pathname.startsWith("/verify"))
//     ) {
//       // return NextResponse.redirect(new URL("/home", origin).toString());
//     }

//     // if (!token && url.pathname.startsWith('/home')){
//     //     return NextResponse.redirect(new URL("/signin", origin).toString());
//     // }

//     if (!token &&
//       (pathname.startsWith('/admin') ||
//       (pathname.startsWith('/admin-products')) || 
//       (pathname.startsWith('/admin-sponsors')))
//     ){
//       return NextResponse.redirect(new URL("/", origin).toString());
//     }
//     if ((token?.role !== "admin") &&
//       (pathname.startsWith('/admin') ||
//       (pathname.startsWith('/admin-products')) || 
//       (pathname.startsWith('/admin-sponsors')))
//     ){
//       return NextResponse.redirect(new URL("/", origin).toString());
//     }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/signin',
//     '/signup',
//     '/',
//     '/dashboard/:path*',
//     '/verify/:path*'
//     ]
// }




import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export { default } from "next-auth/middleware"

// Middleware function
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname, origin } = request.nextUrl
  // console.log(token, "===")

  // Redirect authenticated users away from public pages
  if (
    token &&
    (pathname.startsWith("/signin") ||
      pathname.startsWith("/signup") ||
      pathname === "/" ||
      pathname.startsWith("/verify"))
  ) {
    // return NextResponse.redirect(new URL("/home", origin))
  }

  // Redirect unauthenticated users trying to access admin pages
  if (
    !token &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/admin-coupon') ||
      pathname.startsWith('/admin-donations') ||
      pathname.startsWith('/admin-ecommerce-user') ||
      pathname.startsWith('/admin-foundation-user') ||
      pathname.startsWith('/admin-order') ||
      pathname.startsWith('/admin-products') ||
      pathname.startsWith('/admin-sponsors'))
  ) {
    return NextResponse.redirect(new URL("/", origin))
  }

  // Redirect non-admin users from accessing admin-only pages
  if (
    token?.role !== "admin" && token?.platform == 'foundation' &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/admin-coupon') ||
      pathname.startsWith('/admin-donations') ||
      pathname.startsWith('/admin-ecommerce-user') ||
      pathname.startsWith('/admin-foundation-user') ||
      pathname.startsWith('/admin-order') ||
      pathname.startsWith('/admin-products') ||
      pathname.startsWith('/admin-sponsors'))
  ) {
    return NextResponse.redirect(new URL("/", origin))
  }
  if (
    token?.role !== "admin" && token?.platform == 'ecommerce' &&
    (pathname.startsWith('/admin') ||
      pathname.startsWith('/admin-coupon') ||
      pathname.startsWith('/admin-donations') ||
      pathname.startsWith('/admin-ecommerce-user') ||
      pathname.startsWith('/admin-foundation-user') ||
      pathname.startsWith('/admin-order') ||
      pathname.startsWith('/admin-products') ||
      pathname.startsWith('/admin-sponsors'))
  ) {
    return NextResponse.redirect(new URL("/get-involved", origin))
  }
}

// Configuration for route matching
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/',
    '/home',
    '/dashboard/:path*',
    '/verify/:path*',
    '/admin/:path*',
    '/admin-coupon/:path*',
    '/admin-donations/:path*',
    '/admin-order/:path*',
    '/admin-ecommerce-user/:path*',
    '/admin-foundation-user/:path*',
    '/admin-products/:path*',
    '/admin-sponsors/:path*',
  ]
}
