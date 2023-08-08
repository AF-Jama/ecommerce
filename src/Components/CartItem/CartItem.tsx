"use client"

import React, { useState,useEffect } from "react";
import product from '../../assets/images/logo.svg';
import Link from "next/link";
import { Roboto } from "next/font/google";
import xMark from '../../assets/images/x-mark.png';
import Image from "next/image";
import { getItemCountFromLocalStorage } from "@/utils/utils";
import styles from '../../styles/global.module.css';
import { Product } from "@/types/types";
import { string } from "zod";

const roboto = Roboto({
    weight:['700'],
    display:"swap",
    subsets:["latin"]
})

interface Props{

}


const CartItem:React.FC<Product> = (product)=>{

    const onDeleteItem = (id:number)=>{

        const cartItem = getItemCountFromLocalStorage(); // returns cart items

        if(cartItem.length===0) return;

        let cartItemIndex = cartItem.findIndex(item=>{
            if(item.id===id) return true;

            return false;
        })

        if(cartItemIndex===-1) return;

        cartItem.splice(cartItemIndex,1);

        // console.log(cartItem);

        window.localStorage.setItem("cartItems",JSON.stringify(cartItem));

        
    }





    return (
        <div id="cart-item-container" className="flex items-center">
            <div id="prod-image-container" className="h-12 w-12 md:h-14 md:w-14 rounded-md">
                <Image src={product.image} alt="" className="h-full w-full object-cover" width={500} height={500}/>
            </div>

            <div id="prod-info-container" className="flex-1 ml-2 relative">
                <div className="p-2 grid sm:grid sm:grid-col-2">
                    <Link href={`/store/product/${product.id}`}>
                        <p className={`${roboto.className} text-base`}>{product.title}</p>
                    </Link>
                    <p className="text-sm">{product.category}</p>
                    <p className="font-bold text-sm">${product.price}</p>
                </div>

                <div id="remove-btn-container" className="absolute right-0 top-0">
                    <button className={`p-2 rounded-full`} onClick={e=>onDeleteItem(product.id)}>
                        <Image src={xMark} className="h-4 w-4" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}



export default CartItem;