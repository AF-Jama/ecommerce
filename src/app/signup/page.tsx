import React from "react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { cookies } from 'next/headers'; // Import cookies
import Logo  from '../../assets/images/logo.svg';
import googleLogo from '../../assets/images/google-auth-logo.svg';
import twitterLogo from '../../assets/images/twitter-auth-logo.svg';
import authLogo from '../../assets/images/apple-auth-logo.svg';
import Header from "@/Components/Header/Header";
import * as jwt from 'jsonwebtoken';
import SignUpForm from "@/Components/SignUpForm/SignUpForm";

interface Props{
    req:NextRequest
}

const Page:React.FC<Props> = async ({req})=>{

    const nextCookies = cookies(); // Get cookies object

    const token = nextCookies.get('AT') // Find cookie

    const tokenValue = token?.value as string;

    const secret = process.env.JWT_SECRET_KEY as string;

    jwt.verify(tokenValue, secret, function(err, decoded) {
        if(decoded){
            redirect("/store/home");
        }
    });
  

    return (  

        <div id="sign-up-container" className="h-full flex-1 flex flex-col md:justify-center">
            <SignUpForm/>

            
            <div id="fixed-footer" className="fixed bottom-0 inset-x-0 flex justify-center bg-slate-300 gap-3">
                <p className="text-sm text-gray-700">Contact us</p>
                <p className="text-sm text-gray-700">Privacy</p>
                <p className="text-sm text-gray-700">Legal</p>
                <p className="text-sm text-gray-700">Worldwide</p>
                {/* <p className="text-red-500">{token?.value}</p> */}
            </div>
        </div>
    )
}



export default Page;