"use client"

import React,{ useState, useEffect, useReducer } from "react";


const CartSubmitButton = ()=>{




    return (
        <button className={`bg-black px-4 py-2 text-white rounded mt-2 w-full hover:opacity-90`} onClick={()=>console.log("SUCCESFULL")}>Submit</button>
    )
}



export default CartSubmitButton;