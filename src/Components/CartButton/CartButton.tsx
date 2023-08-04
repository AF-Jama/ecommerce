"use client"

import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import styles from '../../styles/global.module.css';
import { Inter } from "next/font/google";
import cartContext from "@/Contexts/CartContext/CartContext";

const inter = Inter({ subsets: ['latin'] })

interface Props{
    productId:number
}

const AddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, productId:number )=>{
    e.preventDefault();

    console.log(`SUBMIITED ${productId}`);
}


const CartButton:React.FC<Props> = ({ productId })=>{
    const { setAddCartState } = useContext(cartContext);

    const AddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
        e.preventDefault();
   
        setAddCartState(true);
        console.log(`SUBMIITED ${productId}`);
    }


    return (
        // <Button className="bg-black px-4 py-8 text-white rounded-md mt-2">Add To Cart</Button>
        <button className={`bg-black px-4 py-2 rounded-full mt-2 text-white ${styles.btnCart} hover:bg-gray-950 ${inter.className}`} onClick={AddToCart}>Add to Cart</button>
    )
}



export default CartButton;