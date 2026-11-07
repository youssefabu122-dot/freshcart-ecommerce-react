import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })

    const { pathname } = request.nextUrl

    const authPage = ["/login", "/register", "/forgotPassword"]

    const routes = ["/products", "/productDetails", "/categories", "/categoryDetails", "/brands", "/brandDetails", "/cart", "/wishlist", "/payment", "/allorders", "/changePassword"]

    const isProtected = pathname === "/" || routes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    if (!token && isProtected) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && authPage.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/products", "/productDetails/:path*", "/categories", "/categoryDetails/:path*", "/brands", "/brandDetails/:path*", "/cart", "/wishlist", "/payment", "/allorders", "/changePassword", "/login", "/register", "/forgotPassword"],
}
