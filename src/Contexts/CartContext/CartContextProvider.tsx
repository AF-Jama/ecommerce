"use client"

import React,{ useState, useEffect } from "react";
import cartContext from "./CartContext";


const CartContextProvider = ({ children } : { children: React.ReactNode })=>{
    const [addState, setAddState] = useState(false); // set add state 
    


    useEffect(()=>{
        if(addState){
            setTimeout(()=>{
                setAddState(false);
            },3000)
        }
    },[addState]);





    return (
        <cartContext.Provider value={{
            addState:addState,
            setAddCartState:setAddState
        }}>
            {children}
        </cartContext.Provider>
    )
}



export default CartContextProvider;