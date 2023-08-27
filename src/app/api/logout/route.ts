import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function POST(req:NextRequest){

    console.log("LOGOUT SUCCESFULL");

    cookies().set({
        name: 'sid',
        value: "",
        httpOnly: true,
        path: '/',
        expires:new Date(0),
    })


    return NextResponse.json({
        message:"Succesfull logout",
        statusCode:201,
    })

}