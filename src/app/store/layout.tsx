import React from "react";
import * as jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/Components/Header/Header";


export default async function StoreLayout({
    children
}:{
    children: React.ReactNode
}){

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
        <>
            <Header/>

            <main className="w-[95%] max-w-6xl mx-auto">
                {children}
            </main>
        </>   
    )
}