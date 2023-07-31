import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import { LoginBody } from "@/types/types";
import client from "../../../../redis/client";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(request:NextRequest,response:NextResponse){
    const value = await client.get("test");

    return new Response(JSON.stringify({
        test:"SUCCESFUL",
        value:value,
    }));
}


// login POST
export async function POST(request:NextRequest){
    const body: LoginBody = await request.json();

    const { email, name, password } = body; // destructures body object

    const salt = await bcrypt.genSalt(10); // generates unique salt

    const bcryptHash = await bcrypt.hash(password,salt); // generates password hash

    try{

        const res = new NextResponse("Updated token!");

        const user = await prisma.user.create({
            data:{
                email:email,
                name:name,
                passwd:bcryptHash,
                salt:salt
            }
        })

        const sessionId = uuidv4(); // returns session id

        res.cookies.set({
            name:"test",
            value:"1",
            httpOnly:true,
        });

        await client.set(`user-session:${sessionId}`,user.id); // set user session- redis cache

        // redirect('/');

        return new Response("SUCCESFUL");
    }catch(error){
        console.log(error);
        return new Response(JSON.stringify({
            error:"Login Error",
            statusCode:400
        }));
    }

    // return new Response("SUCCESFUL");
}