"use client"

import React, { useContext, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Product } from "@/types/types";
import styles from '../../styles/global.module.css';
import { Inter } from "next/font/google";
import cartContext from "@/Contexts/CartContext/CartContext";
import { getItemCountFromLocalStorage } from "@/utils/utils";
import { checkCartItems } from "@/utils/utils";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,  } from "@chakra-ui/react";

const inter = Inter({ subsets: ['latin'] })

interface Props{
    title:string,
    id:number,
    sessionId:string,
}

const AddToCart = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, productId:number )=>{
    e.preventDefault();

    console.log(`SUBMIITED ${productId}`);
}


const CartButton:React.FC<Props> = ({ title, id, sessionId })=>{
    const { addState,setAddCartState,setErrorState } = useContext(cartContext);
    const [value, setValue] = useState(1); // set item quantity

    const AddToCart = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent> )=>{
        e.preventDefault();

        const data = {
            title:title,
            quantity:value,
            id:id,
        } // data that is added to cart set

        let res = await fetch(`/api/cart/add`,{
            body:JSON.stringify(data),
            method:"POST",
        });

        let ress = await res.json() as {
            message:string,
            statusCode:number,
        };

        console.log(ress);

        if(ress.statusCode===201){
            setAddCartState(true);
            return;
        }

        setErrorState(true);


    }


    return (
        // <Button className="bg-black px-4 py-8 text-white rounded-md mt-2">Add To Cart</Button>
        <>
            <button className={`w-full max-w-[250px] mb-2 bg-black px-4 py-2 rounded-md mt-2 text-white font-semibold ${styles.btnCart} hover:bg-gray-950 ${inter.className}`} onClick={AddToCart}>Add to Cart</button>

            <NumberInput defaultValue={1} min={1} max={20} className="w-full max-w-[250px]" onChange={valueString=>setValue(parseInt(valueString))}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </>
    )
}



export default CartButton;