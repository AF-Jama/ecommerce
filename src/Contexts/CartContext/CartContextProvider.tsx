"use client"

import React,{ useState, useEffect } from "react";
import cartContext from "./CartContext";


const CartContextProvider = ({ children } : { children: React.ReactNode })=>{
    const [addState, setAddState] = useState(false); // set add state 
    const [errorState,setErrorState] = useState(false); // set error state
    


    useEffect(()=>{
        if(addState){
            setTimeout(()=>{
                setAddState(false);
            },3000)
        }

        if(errorState){
            setTimeout(()=>{
                setErrorState(false);
            },3000)
        }
    },[addState,errorState]);





    return (
        <cartContext.Provider value={{
            addState:addState,
            setAddCartState:setAddState,
            errorState:errorState,
            setErrorState:setErrorState
        }}>
            {children}
        </cartContext.Provider>
    )
}



export default CartContextProvider;