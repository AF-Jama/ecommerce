"use client"

import React,{ useState, useEffect } from "react";
import cartContext from "./CartContext";


const CartContextProvider = ({ children } : { children: React.ReactNode })=>{
    const [addState, setAddState] = useState(false); // set add state 
    const [errorState,setErrorState] = useState(false); // set error state
    const [deleteState,setDeleteState] = useState(false); // set delete state
    


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

        if(deleteState){
            setTimeout(()=>{
                setDeleteState(false);
            },3000)
        }
    },[addState,errorState,deleteState]);





    return (
        <cartContext.Provider value={{
            addState:addState,
            setAddCartState:setAddState,
            errorState:errorState,
            setErrorState:setErrorState,
            deleteState:deleteState,
            setDeleteState:setDeleteState,
        }}>
            {children}
        </cartContext.Provider>
    )
}



export default CartContextProvider;