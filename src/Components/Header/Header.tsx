"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from "next/link";
import Cookies from 'js-cookie';
import { parseCookies,destroyCookie } from 'nookies';
import { useContext } from "react";
import { useRouter } from "next/navigation";
import cartContext from "@/Contexts/CartContext/CartContext";
import Logo from '../../assets/images/logo.svg';
import cart from '../../assets/images/cart.png';
import Image from "next/image";
import style from '../../styles/global.module.css';
import styles from '../../styles/header.module.css';
import { getItemCountFromLocalStorage } from "@/utils/utils";
import { Product } from "@/types/types";

interface Props{
    authState:boolean,
    sessionId:string,
}

const Header:React.FC<Props> = ({ authState, sessionId  })=>{
    const [loginState,setLoginState] = useState(true); // set login state
    const [visibility,setVisibility] = useState(false);
    const { addState, setAddCartState, deleteState } = useContext(cartContext);
    const [cartItems,setCartItems] = useState<number>(0);
    const router = useRouter();

    console.log(visibility);
    // console.log(window);

    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'cartItems') {
          if (!event.newValue) {
            // If there is no new value, set cartItems to an empty array
            setCartItems(0);
            return;
          }
  
          const cartItems: Product[] = JSON.parse(event.newValue);
          setCartItems(cartItems.length);
        }
      }; // handle storage change on storage event listener trigger

    const onLogout = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();

        await fetch('/api/logout',{
            method:"POST"
        })

        router.push('/login');

    }


    useEffect(()=>{
        const fetchCart = async ()=>{
            let res = await fetch(`/api/cart/all`);

            let ress = await res.json() as Array<any>;

            setCartItems(ress.length);
        }

        fetchCart();
        
    },[addState,deleteState]);


    return (
        <header className="min-h-[2vh]">
            <div id="header-inner-container" className="w-[95%] max-w-6xl mx-auto flex justify-between items-center p-2">

                {/* <div id="b-btn-container" className={visibility?styles.change:styles.container} onClick={()=>setVisibility(!visibility)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div> */}

                <Link href={`/store/home`}>
                    <div id="logo-image-container">
                        <Image src={Logo} className="h-10 w-10 md:h-12 md:w-12" alt=""/>
                    </div>
                </Link>

                <Link href={`/store/cart`}>
                    <div id="cart-container" className="flex relative p-3">
                        <Image src={cart} className="h-10 w-10 ml-2" alt=""/>
                        <p className={`font-bold text-black mt-2 ${style.cartItemsNumber} py-1 px-2`}>{(cartItems===0)?"":cartItems}</p>
                    </div>
                </Link>

                <div id="auth-btn"> 
                    <Button colorScheme='green' className="bg-red-500 rounded-md" onClick={onLogout}>Logout</Button>
                </div>

            </div>
        </header>
    )
}



export default Header;