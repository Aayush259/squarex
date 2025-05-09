import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // Get the session token with explicit configuration
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
        cookieName: 'next-auth.session-token'
    });

    // Check if the user is authenticated
    const isAuthenticated = !!session;

    // Allow access to auth-related endpoints
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next();
    }

    // Allow access to the sign-in, sign-up pages and portfolio routes
    const isSignInOrSignUp = pathname.startsWith('/signin') || pathname.startsWith('/signup');
    const isPortfolioRoute = pathname.startsWith('/portfolio');

    // If the user is not authenticated and trying to access a protected route (excluding portfolio routes), redirect to sign-in
    if (!isAuthenticated && !isSignInOrSignUp && !isPortfolioRoute) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // If the user is authenticated and trying to access sign-in or sign-up, redirect to home
    if (isAuthenticated && isSignInOrSignUp) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Continue to the requested route
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|avif|webp|svg)).*)"], // Apply middleware to all routes except API and static files
};