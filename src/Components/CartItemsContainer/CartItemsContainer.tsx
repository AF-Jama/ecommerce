"use client"

import { useEffect, useState } from "react"
import Link from "next/link";
import { Product } from "@/types/types";
import { Roboto } from "next/font/google";
import { getItemCountFromLocalStorage } from "@/utils/utils";
import CartItem from "../CartItem/CartItem";

const roboto = Roboto({
    weight:["400"],
    display:"swap",
    subsets:["latin"]
})


const CartItemsContainer = ()=>{
    const [cartItems,setCartItems] = useState<Product[]|null>(null);

    const handleStorageChange = (event:StorageEvent)=>{
        if(event.key==="cartItems"){
            if(!event.newValue){
                return;
            };

            const cartItems = JSON.parse(event.newValue) as Product[];
    
            window.localStorage.setItem("cartItems",JSON.stringify(cartItems));

            setCartItems(cartItems);
        }
    }


    useEffect(()=>{

        const cartItem = getItemCountFromLocalStorage(); // returns cart items if exists or empty array

        if(cartItem.length===0){
            // triggered if cart item returns null (ie: cart is empty)
            setCartItems([]);
            return;
        }

        setCartItems(cartItem);

        window.addEventListener("storage",handleStorageChange);

        return ()=> window.removeEventListener("storage",handleStorageChange);
    },[]);




    return (
        <div id="cart-container">
            {(!cartItems|| cartItems.length===0) && <p className={`text-lg font-semibold m-2 ${roboto.className}`}>No Items within your cart</p>}

            {
                cartItems &&

                cartItems.map(item=>(
                    <CartItem id={item.id} title={item.title} image={item.image} price={item.price} category={item.category} description={item.description} />
                    
                ))
            }
        </div>
    )
}



export default CartItemsContainer;