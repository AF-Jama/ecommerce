import React from "react";
import * as jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";     


const Page:React.FC = ()=>{

    const nextCookies = cookies(); // Get cookies object

    const token = nextCookies.get('AT'); // Find cookie

    const tokenValue = token?.value as string;

    const secret = process.env.JWT_SECRET_KEY as string;

    jwt.verify(tokenValue, secret, function(err, decoded) {
        if(err){
            redirect("/login");
        }
    });




    return (
        <h1 className="text-red-500">AUTH PAGE</h1>
    )
}



export default Page;