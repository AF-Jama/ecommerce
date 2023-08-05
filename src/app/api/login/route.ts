import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import { cookies } from "next/headers";
import * as jwt from 'jsonwebtoken';
import { LoginBody } from "@/types/types";
import { LoginSchema } from "@/utils/utils";
// import client from "../../../../redis/client";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(request:NextRequest,response:NextResponse){
    // const value = await client.get("test");

    return new Response(JSON.stringify({
        test:"SUCCESFUL",
        value:"value",
    }));
}


// login POST
export async function POST(request:NextRequest){
    const body: LoginBody = await request.json();

    const { email, password } = body; // destructures body object

    try{
        const schemaResult = LoginSchema.safeParse({
            email:email,
            password:password
        })

        if(!schemaResult.success) throw new Error("Payload cannot be validated or is not valid");

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                email:email
            }
        })

        const secret = process.env.JWT_SECRET_KEY as string;

        const token = jwt.sign({
            userId: user.id,
            email:user.email,
            name:user.name
          }, secret, { expiresIn: 7 * 24*60*60 }); // generates access token with payload
          
        cookies().set({
            name: 'AT',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge:7 * 24*60*60
        })

        return new Response(JSON.stringify({
            message:"Succesfully logs in",
            statusCode:201
        }));
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify({
            error:"Login Error",
            statusCode:400
        }));
    }

    // return new Response("SUCCESFUL");
}