"use client"

import React, { useState } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from "next/link";
import { useContext } from "react";
import cartContext from "@/Contexts/CartContext/CartContext";
import Logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.png';
import Image from "next/image";
import style from '../../styles/global.module.css';
import styles from '../../styles/header.module.css';

const Header = ()=>{
    const [loginState,setLoginState] = useState(true); // set login state
    const [visibility,setVisibility] = useState(false);
    const { addState, setAddCartState } = useContext(cartContext);

    console.log(visibility);


    return (
        <header className="min-h-[2vh]">
            <div id="header-inner-container" className="w-[95%] max-w-6xl mx-auto flex justify-between items-center p-2">

                <div id="b-btn-container" className={visibility?styles.change:styles.container} onClick={()=>setVisibility(!visibility)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>

                <Link href={`/store/home`}>
                    <div id="logo-image-container">
                        <Image src={Logo} className="h-10 w-10 md:h-12 md:w-12" alt=""/>
                    </div>
                </Link>

                <Link href={`/store/cart`}>
                    <div id="cart-container" className="flex relative p-3">
                        <Image src={cart} className="h-10 w-10 ml-2" alt=""/>
                        <p className={`font-bold text-black mt-2 ${style.cartItemsNumber} py-1 px-2`}>122</p>
                    </div>
                </Link>

                {/* <div id="auth-btn">
                    {
                        loginState?<Button colorScheme='green' className="bg-red-500 rounded-md">Logout</Button>:<Button colorScheme='green' className="bg-purple-600 rounded-md">Login</Button>
                    }
                </div> */}

            </div>
        </header>
    )
}



export default Header;