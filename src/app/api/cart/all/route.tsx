import { NextRequest, NextResponse } from "next/server";


export async function GET(request:NextRequest,response:NextResponse){

    return new Response(JSON.stringify({
        test:"SUCCESFUL",
        value:"value",
    }));
}