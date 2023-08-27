import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import client from '../redis/client';
import * as jwt from 'jsonwebtoken';
import { Token } from './types/types';
import { string } from 'zod';
import { redirect } from 'next/dist/server/api-utils';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path==='/login' || path==='/signup'

    const sessionId = request.cookies.get('sid')?.value || ''; // returns access token if exists or returns empty string

    const isSessionExist = await client.exists(`session:${sessionId}`); // returns boolean if session exists

    if(isPublicPath && isSessionExist){
        // triggered if path is public and access token exists
        return NextResponse.redirect(new URL('/store/home', request.url));
    }

    if(path==='/'){
        return NextResponse.redirect(new URL('/store/home', request.url));
    }

    if(path.startsWith('/api') && !isSessionExist){
        // triggered if endpoint is starts with '/api' and no session id exists
        return NextResponse.json({
            message:"Valid session id is required",
            statusCode:401
        })
    }

    if(!isPublicPath && !isSessionExist){
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