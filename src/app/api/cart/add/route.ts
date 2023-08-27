import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import client from "../../../../../redis/client";


export async function POST(req:NextRequest){
    try{

        let sid = cookies().get('sid')?.value || ''; // returns session id or empty string

        let { id, quantity } = await req.json() as {
            id:number,
            quantity:number
        };

        const isProductExist = await client.hexists(`cart:${sid}`,`${id}`); // returns boolean if product exists within hash

        if(isProductExist===1){
            return NextResponse.json({
                message:"Product already exists within the cart",
                statusCode:405,
            })
        }

        await client.hsetnx(`cart:${sid}`,`${id}`,quantity);

        return NextResponse.json({
            message:`Product id ${id} added to cart`,
            statusCode:201,
        })

    }catch(error){
        console.log(`Error: ${error}`);
        return NextResponse.json({
            message:"Could not add product to cart",
            statusCode:401
        })
    }

}