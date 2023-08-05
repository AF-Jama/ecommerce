import { NextRequest, NextResponse } from 'next/server';
import { Token } from '@/types/types';
import * as jwt from 'jsonwebtoken';


export async function GET(request:NextRequest){
    try{
        const token = request.cookies.get('AT')?.value || ''; // returns access token or empty string

        if(!token) throw new Error('Token does not exist');

        const secret = process.env.JWT_SECRET_KEY as string;

        const decoded = jwt.verify(token,secret) as Token; // decoded token returned or throws error

        return NextResponse.json({
            name:decoded.name,
            email:decoded.email,
            userId:decoded.userId
        })

    }catch(error:any){
        return NextResponse.json({
            statusCode:500,
            message:error.message
        });
    }
}