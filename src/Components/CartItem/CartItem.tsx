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
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    quantity:number,
    refetch:any,
}


const CartItem:React.FC<Props> = ({ id, category, description, image, price, title, quantity, refetch })=>{

    const onDeleteItem = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>)=>{
        e.preventDefault();

        let res = await fetch('/api/cart/remove',{
            body:JSON.stringify({
                id:id
            }),
            method:"POST"
        })

        let ress = await res.json() as {
            message:string,
            statusCode:number,
        };

        if(ress.statusCode===201){
            refetch();
            return;
        }

        console.log("CANNOT DELETE ITEM");


    }



    return (
        <div id="cart-item-container" className="flex items-center">
            <div id="prod-image-container" className="h-12 w-12 md:h-14 md:w-14 rounded-md">
                <Image src={image} alt="" className="h-full w-full object-contain" width={500} height={500}/>
            </div>

            <div id="prod-info-container" className="flex-1 ml-2 relative">
                <div className="p-2 grid sm:grid sm:grid-col-2">
                    <Link href={`/store/product/${id}`}>
                        <p className={`${roboto.className} text-base`}>{title}</p>
                    </Link>
                    <p className="text-sm">{category}</p>
                    <p className="font-bold text-sm">${price}</p>
                    <p className="text-sm font-bold">Quantity: {quantity}</p>
                </div>

                <div id="remove-btn-container" className="absolute right-0 bottom-0">
                    <button className={`p-2 rounded-full`}>
                        <Image src={xMark} className="h-4 w-4" onClick={onDeleteItem} alt=""/>
                    </button>
                </div>
            </div>
        </div>
    )
}



export default CartItem;