import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken';
import { Token } from './types/types';
import { string } from 'zod';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path==='/login' || path==='/signup'

    const accessToken = request.cookies.get('AT')?.value || ''; // returns access token if exists or returns empty string

    if(isPublicPath && accessToken){
        // triggered if path is public and access token exists
        return NextResponse.redirect(new URL('/store/home', request.url))
    }

    if(path==="/"){
        return NextResponse.redirect(new URL('/store/home', request.url))
    }

    if(path.startsWith('/api') && !accessToken){
        // triggered if endpoint is starts with '/api' and no access token exists
        return NextResponse.json({
            message:"Access token is required",
            statusCode:401
        })
    }

    if(!isPublicPath && !accessToken){
        // triggered path is private (not public) and no access token
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login', // public (unauthenticated path)
    '/signup', // public (unauthenticated path),
    '/',
    '/store/:path*', // private path,
    '/api/user/me',
    '/api/cart/all',
  ]
}