import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import type { LoginBody } from "@/types/types";
import client from "../../../../redis/client";
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { userSignUpSchema } from "@/utils/utils";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function GET(request:NextRequest,response:NextResponse){

    console.log(process.env.JWT_SECRET_KEY)

    return new Response(JSON.stringify({
        test:"SUCCESFUL",
    }));
}

export async function POST(request:NextRequest,res:NextResponse){
    const response = new NextResponse();
    const sessionId = uuidv4(); // returns session id

    const body: LoginBody = await request.json();

    const { email, name, password } = body; // destructures body object

    try{ 
        const schemaResult = userSignUpSchema.safeParse({
            name:name,
            email:email,
            password:password
        }) // parsing input into zod schema
        
        if(!schemaResult.success) throw new Error("Payload cannot be validated or is not valid");
        
        const salt = await bcrypt.genSalt(10); // generates unique salt
    
        const bcryptHash = await bcrypt.hash(password,salt); // generates password hash

        const user = await prisma.user.create({
            data:{
                email:email,
                name:name,
                passwd:bcryptHash,
                salt:salt
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
            message:"Succesfully created user",
            statusCode:201
        }));
    }catch(error){
        console.log(`error is ${error}`);
        return new Response(JSON.stringify({
            message:"Login Error",
            statusCode:400
        }));
    }

    // return new Response("SUCCESFUL");
}