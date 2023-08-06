import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/types";

const userSignUpSchema = z.object({
    name:z.string().min(4,"Name is required"),
    email:z.string().email("Invalid Email Address"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
})

const LoginSchema = z.object({
    email:z.string().email("Invalid Email Address"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
})

function capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// export function getTokenData(request:NextRequest){


// }

const checkCartItems = (item:Product,cartItems:Product[])=>{
    return cartItems.some(el=>el.id===item.id);
}

const getItemCountFromLocalStorage = () => {
    const items:Product[] = JSON.parse(window.localStorage.getItem('cartItems') || '[]'); // returns item from cart storage or empty array
    return items;
};

export type userSignUp = z.infer<typeof userSignUpSchema>
export type LoginType  = z.infer<typeof LoginSchema>
export {
    userSignUpSchema,
    LoginSchema,
    capitalizeFirstLetter,
    checkCartItems,
    getItemCountFromLocalStorage
}