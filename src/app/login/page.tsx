import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jwt from 'jsonwebtoken';
import LoginForm from "@/Components/LoginForm/LoginForm";


const Page:React.FC = ()=>{

    const nextCookies = cookies(); // Get cookies object

    const token = nextCookies.get('AT'); // Find cookie

    const tokenValue = token?.value as string;

    const secret = process.env.JWT_SECRET_KEY as string;

    jwt.verify(tokenValue, secret, function(err, decoded) {
        if(decoded){
            redirect("/home");
        }
    });


    return (
        <div id="login-page-container" className="flex-1 flex flex-col md:justify-center">
            <LoginForm/>

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