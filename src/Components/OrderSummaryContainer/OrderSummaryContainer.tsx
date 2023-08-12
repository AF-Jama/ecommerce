"use client";

import React, { useState, useEffect, useReducer } from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { getItemCountFromLocalStorage } from "@/utils/utils";
import { Product } from "@/types/types";

const inter = Inter({
    weight:["400"],
    display:"swap",
    subsets:["latin"]
})


function accumulateCart(accumulate:number,currentValue:Product){
    return accumulate + currentValue.price;
}

const OrderSummaryContainer:React.FC = ()=>{
    const [orderTotal,setOrderTotal] = useState<number>(0.00);
    
    const handleStorageChange = (event:StorageEvent)=>{
        if(event.key==="cartItems"){
            if(!event.newValue){
                setOrderTotal(0.00);
                return;
            }

            const updatedCart:Product[] = JSON.parse(event.newValue);
    
            const accumlatedCartPrice = updatedCart.reduce(accumulateCart,0); // returns accumulated price
    
            setOrderTotal(accumlatedCartPrice);
        }
        
    } // handle storage change on storage event listener trigger
    
    useEffect(()=>{

        const cartItem = getItemCountFromLocalStorage();

        if(cartItem.length===0){
            setOrderTotal(0.00);
            return;
        }

        const accumlatedCartPrice = cartItem.reduce(accumulateCart,0); // returns accumulated price

        setOrderTotal(accumlatedCartPrice);

        
        window.addEventListener("storage",handleStorageChange);



        return ()=> window.removeEventListener("storage",handleStorageChange);
    },[])




    return (
        <div className="bg-gray-50 p-2">
            <div>
                <h1 className={`text-xl font-bold ${inter.className}`}>Order Summary</h1>
            </div>
            <hr />
            <div className="flex justify-between">
                <p className={`text-lg font-bold ${inter.className}`}>Order Total</p>
                <p className="font-bold text-lg">${orderTotal}</p>
            </div>

            <Link href={`/store/confirmation`}>
                <button className={`bg-black px-4 py-2 text-white rounded mt-2 w-full hover:opacity-90`}>Submit</button>
            </Link>
        </div>
    )
}



export default OrderSummaryContainer;