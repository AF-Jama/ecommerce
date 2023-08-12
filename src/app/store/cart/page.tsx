import React from "react";
import CartItem from "@/Components/CartItem/CartItem";
import AddItem from "@/Components/AddItem/AddItem";
import { Inter } from "next/font/google";
import CartItemsContainer from "@/Components/CartItemsContainer/CartItemsContainer";
import OrderSummaryContainer from "@/Components/OrderSummaryContainer/OrderSummaryContainer";
import CartSubmitButton from "@/Components/CartSubmitButton/CartSubmitButton";
import Link from "next/link";

const inter = Inter({
    weight:["400"],
    subsets:["latin"],
    display:"swap"
})

const Page:React.FC = ()=>{






    return (
        <>
            <div className="mt-10 border">
                <h2 className="text-2xl font-semibold">Shopping Cart</h2>

                <div id="products-cart-container" className="md:grid md:grid-cols-6 p-2">
                    <div id="cart-container" className="md:col-start-1 md:col-end-4">
                        <CartItemsContainer/>
                    </div>

                    <div id="cart-total-container" className=" md:col-start-5 md:col-end-7">
                        <OrderSummaryContainer/>    

                    </div>
                </div>
            </div>
        </>
    )
}



export default Page;