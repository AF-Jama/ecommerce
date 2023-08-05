import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken';
import { Token } from "@/types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(request:NextRequest){
    const { productId, qauntity  } = await request.json() as {
        productId:number,
        qauntity:number
    }; // destructures body

    try{
        const token = request.cookies.get('AT')?.value; // returns access token or empty string

        if(!token) throw new Error('Token does not exist');

        const secret = process.env.JWT_SECRET_KEY as string;

        const decoded = jwt.verify(token,secret) as Token; // decoded token returned or throws error

        const { userId, email, name } = decoded;

        // fetch cartId that is linked with userId, if not exists create cart

        const cart = await prisma.cart.findFirst({
            where:{
                userId:userId
            }
        })

        if(!cart){
            // cart does not exist thus cart should be created and item should be added
              
        }

    }catch(error:any){
        return NextResponse.json({
            statusCode:500,
            message:error.message
        });
    }
}