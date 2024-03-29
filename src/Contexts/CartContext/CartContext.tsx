import React, { createContext } from "react";
import { boolean } from "zod";

interface Props{
    addState:boolean,
    setAddCartState:React.Dispatch<React.SetStateAction<boolean>>,
    errorState:boolean,
    setErrorState:React.Dispatch<React.SetStateAction<boolean>>,
    deleteState:boolean,
    setDeleteState:React.Dispatch<React.SetStateAction<boolean>>
}

const cartContext = createContext<Props>({
    addState:false,
    setAddCartState: ()=>{},
    errorState:false,
    setErrorState:()=>{},
    deleteState:false,
    setDeleteState:()=>{}
});



export default cartContext;