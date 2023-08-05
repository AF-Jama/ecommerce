import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken';
import { Token } from './types/types';
import { string } from 'zod';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path==='/login' || path==='/signup'

    console.log(isPublicPath);

    const accessToken = request.cookies.get('AT')?.value || ''; // returns access token if exists or returns empty string

    console.log(accessToken.length);

    if(isPublicPath && accessToken){
        console.log("NOT HIT");
        return NextResponse.redirect(new URL('/store/home', request.url))
    }

    if(path.startsWith('/api') && !accessToken){
        return NextResponse.json({
            message:"Access token is required",
            statusCode:401
        })
    }

    // if(path.startsWith('/api') && accessToken){

    //     const token = process.env.JWT_SECRET as string;

    //     try{
    //         let decoded = jwt.verify(accessToken,token) as Token;

    //     }catch(error){

    //     }

    //     // return NextResponse.json({
    //     //     message:"Access token is required",
    //     //     statusCode:401
    //     // })
    // }

    if(!isPublicPath && !accessToken){
        console.log('HIT');
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login', // public (unauthenticated path)
    '/signup', // public (unauthenticated path)
    '/store/:path*', // private path,
    '/api/user/me',
    '/api/cart/all'
  ]
}