"use client"

import React, { useState } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import Logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.png';
import Image from "next/image";
import styles from '../../styles/header.module.css';

const Header = ()=>{
    const [loginState,setLoginState] = useState(true); // set login state
    const [visibility,setVisibility] = useState(false);

    console.log(visibility);


    return (
        <header className="min-h-[2vh]">
            <div id="header-inner-container" className="w-[95%] max-w-6xl mx-auto flex justify-between items-center p-2">

                <div id="b-btn-container" className={visibility?styles.change:styles.container} onClick={()=>setVisibility(!visibility)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>

                <div id="logo-image-container">
                    <Image src={Logo} className="h-10 w-10 md:h-12 md:w-12" alt=""/>
                </div>

                <div id="cart-container">
                    <Image src={cart} className="h-10 w-10" alt=""/>
                </div>

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