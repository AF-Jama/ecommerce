import React from "react";
import CartItem from "@/Components/CartItem/CartItem";
import AddItem from "@/Components/AddItem/AddItem";
import { Inter } from "next/font/google";
import OrderSummaryContainer from "@/Components/OrderSummaryContainer/OrderSummaryContainer";
import CartSubmitButton from "@/Components/CartSubmitButton/CartSubmitButton";
import CartContainer from "@/Components/CartContainer/CartContainer";
import Link from "next/link";

const inter = Inter({
    weight:["400"],
    subsets:["latin"],
    display:"swap"
})

const Page:React.FC = ()=>{






    return (
        <>

            <h2 className="text-2xl text-center my-2 text-black font-bold">Cart</h2>

            <CartContainer/>
        </>
    )
}



export default Page;