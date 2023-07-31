import React from "react"
import Image from "next/image";
import Logo  from '../../assets/images/logo.svg';
import googleLogo from '../../assets/images/google-auth-logo.svg';
import twitterLogo from '../../assets/images/twitter-auth-logo.svg';
import authLogo from '../../assets/images/apple-auth-logo.svg';
import Header from "@/Components/Header/Header";
import SignUpForm from "@/Components/SignUpForm/SignUpForm";


const Page:React.FC = async ()=>{




    return (  

        <div id="sign-up-container" className="h-full flex-1 flex flex-col md:justify-center">
            <SignUpForm/>

            
            <div id="fixed-footer" className="fixed bottom-0 inset-x-0 flex justify-center bg-slate-300 gap-3">
                <p className="text-sm text-gray-700">Contact us</p>
                <p className="text-sm text-gray-700">Privacy</p>
                <p className="text-sm text-gray-700">Legal</p>
                <p className="text-sm text-gray-700">Worldwide</p>
            </div>
        </div>
    )
}



export default Page;