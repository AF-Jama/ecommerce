"use client"

import React, { useContext, useState} from 'react';
import cartContext from '@/Contexts/CartContext/CartContext';
import { Inter } from 'next/font/google';
import styles from '../../styles/global.module.css';

const inter = Inter({
    weight:['400'],
    subsets:['latin'],
    display:'block'
})

interface Props{
    message:string
}




const ErrorItem:React.FC<Props> = ({ message })=>{
    const { errorState } = useContext(cartContext);




    return (
        <div id='add-item' className={`${inter.className} ${styles.errorItem} ${errorState?styles.errorItemShow:styles.errorItemHide} bg-slate-200 fixed top-0 left-0 right-0 font-semibold p-2 rounded-lg text-center`}>
            { message }
        </div>
    )
}



export default ErrorItem;