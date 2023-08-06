"use client"

import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { Product } from "@/types/types";
import styles from '../../styles/global.module.css';
import { Inter } from "next/font/google";
import cartContext from "@/Contexts/CartContext/CartContext";
import { getItemCountFromLocalStorage } from "@/utils/utils";
import { checkCartItems } from "@/utils/utils";

const inter = Inter({ subsets: ['latin'] })

interface Props{
    productData:Product
}

const AddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, productId:number )=>{
    e.preventDefault();

    console.log(`SUBMIITED ${productId}`);
}


const CartButton:React.FC<Props> = ({ productData })=>{
    const { addState,setAddCartState,setErrorState } = useContext(cartContext);

    const AddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
        // add item to local storage
        const cartItem = getItemCountFromLocalStorage();

        if(cartItem.length===0){
            window.localStorage.setItem("cartItems",JSON.stringify([productData]));
            setAddCartState(true);
            return;

        }

        const isInCart = checkCartItems(productData,cartItem); // returns boolean value if product exists within cart

        if(!isInCart){
            // triggered if product does not exists within cart
            cartItem.push(productData); 
            window.localStorage.setItem("cartItems",JSON.stringify(cartItem));
            setAddCartState(true);
            return;
        }
        
        setErrorState(true);
        return;
    }


    return (
        // <Button className="bg-black px-4 py-8 text-white rounded-md mt-2">Add To Cart</Button>
        <button className={`bg-black px-4 py-2 rounded-md mt-2 text-white font-semibold ${styles.btnCart} hover:bg-gray-950 ${inter.className}`} onClick={AddToCart}>Add to Cart</button>
    )
}



export default CartButton;