import React from "react";
import * as jwt from 'jsonwebtoken';
import { ChakraProvider } from "@chakra-ui/react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/Components/Header/Header";
import AddItem from "@/Components/AddItem/AddItem";
import ErrorItem from "@/Components/ErrorItem/ErrorItem";
import DeleteItem from "@/Components/DeleteItem/DeleteItem";


const queryClient = new QueryClient();


export default async function StoreLayout({
    children
}:{
    children: React.ReactNode
}){

    // const nextCookies = cookies(); // Get cookies object

    // const token = nextCookies.get('AT'); // Find cookie

    // const tokenValue = token?.value as string;

    // const secret = process.env.JWT_SECRET_KEY as string;

    // jwt.verify(tokenValue, secret, function(err, decoded) {
    //     if(err){
    //         redirect("/login");
    //     }
    // });

    const sid = cookies().get('sid')?.value || ''; // returns sid or empty string


    return (
        <>
            <Header authState={true} sessionId={sid}/>

            <main className="w-[95%] max-w-6xl mx-auto">
                {children}
            </main>

            <AddItem/>
            <ErrorItem message="Product already in cart"/>
            <DeleteItem/>
        </>   
    )
}