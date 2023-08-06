import React from "react";
import CartItem from "@/Components/CartItem/CartItem";
import AddItem from "@/Components/AddItem/AddItem";
import { Inter } from "next/font/google";
import CartItemsContainer from "@/Components/CartItemsContainer/CartItemsContainer";
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

                <div id="products-cart-container" className="md:grid md:grid-cols-6">
                    <div id="cart-container" className="md:col-start-1 md:col-end-4">
                        <CartItemsContainer/>
                    </div>

                    <div id="cart-total-container" className=" md:col-start-5 md:col-end-7">

                        <div className="bg-gray-50 p-2">
                            <div>
                                <h1 className={`text-xl font-bold ${inter.className}`}>Order Summary</h1>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <p className={`text-lg font-bold ${inter.className}`}>Order Total</p>
                                <p className="font-bold">$22.00</p>
                            </div>

                            <Link href={`/store/confirmation`}>
                                <button className={`bg-black px-4 py-2 text-white rounded mt-2 w-full hover:opacity-90`}>Submit</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}



export default Page;