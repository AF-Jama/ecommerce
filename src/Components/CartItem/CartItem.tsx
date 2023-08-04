"use client"

import React, { useState,useEffect } from "react";
import product from '../../assets/images/logo.svg';
import { Roboto } from "next/font/google";
import xMark from '../../assets/images/x-mark.png';
import Image from "next/image";
import styles from '../../styles/global.module.css';

const roboto = Roboto({
    weight:['700'],
    display:"swap",
    subsets:["latin"]
})

interface Props{

}


const CartItem:React.FC<Props> = ()=>{






    return (
        <div id="cart-item-container" className="flex items-center">
            <div id="prod-image-container" className="h-12 w-12 md:h-14 md:w-14 rounded-md">
                <Image src={product} alt="" className="h-full w-full object-cover"/>
            </div>

            <div id="prod-info-container" className="flex-1 ml-2 relative">
                <div className="p-2 grid sm:grid sm:grid-col-2">
                    <p className={`${roboto.className} text-base`}>Product Name</p>
                    <p className="text-sm">Category</p>
                    <p className="font-bold text-sm">$14.00</p>
                </div>

                <div id="remove-btn-container" className="absolute right-0 top-0">
                    <button className={`p-2 bg-slate-300 shadow-md rounded-full`}>
                        <Image src={xMark} className="h-4 w-4" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}



export default CartItem;