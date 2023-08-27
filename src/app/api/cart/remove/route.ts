import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../redis/client";
import { cookies } from "next/headers";

interface Body{
    id:string
}


export async function POST(req:NextRequest){
    const { id }:Body  = await req.json(); // destructure payload
    const sid = cookies().get('sid')?.value || ''; // returns sid or empty string

    try{

        let isProductExist = await client.hexists(`cart:${sid}`,id);

        // if(isProductExist===1) throw new Error; // triggered if product does not exist within cart

        await client.hdel(`cart:${sid}`,id);

        return NextResponse.json({
            message:"Product removed from cart",
            statusCode:201
        })



    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Product cannot be removed from cart",
            statusCode:405,
        })

    }
}