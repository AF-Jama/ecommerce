"use client";

import React from "react";
import { Roboto } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import CartItem from "../CartItem/CartItem";

interface Product{
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    quantity:number
}


const roboto = Roboto({
    weight:["400"],
    subsets:["latin"],
    display:"block",
})


const CartContainer = ()=>{
    const { data, isLoading, isError, refetch, isRefetching } = useQuery<Product[],Error>({
        queryFn:()=>fetch(`/api/cart/all`,{
        }).then(res=>res.json()).catch(err=>[]),
        queryKey:[],
    });

    console.log(data);




    return (
        <div id="cart-container" className="md:grid md:grid-cols-6">
            <div id="product-container" className="md:col-start-1 md:col-end-5 p-2 gap-2">

                {
                    ((isError||isLoading) || !data)

                    &&

                    <p className={`text-xl font-black ${roboto.className}`}>Fetching Cart Items</p>

                }

                {
                (data && data.length===0) && <h1 className={`text-xl font-black ${roboto.className}`}>No Product in cart</h1>
                }

                {
                    (data && !isLoading && !isError)

                    &&

                    data.map(product=>(
                        <CartItem image={product.image} id={product.id} title={product.title} category={product.category} price={product.price} description={product.description} quantity={product.quantity} refetch={refetch} key={product.id}/>
                    ))
                }

            </div>

            <div id="order-container" className="md:col-start-5 md:col-end-7">
                <div className="p-2">
                    <div className="text-xl font-bold">
                        Cart Total
                    </div>

                    <div className="flex justify-between">
                        <div className="text-lg font-semibold">
                            Total
                        </div>

                        <div>
                            {
                                ((data && data.length===0)||isError||isLoading) && <p>$0.00</p>

                            }

                            {
                                (data && !isLoading && !isError) 

                                &&

                                <p className="text-lg font-bold">${data.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2)}</p>
                            }
                        </div>
                    </div>
                    <div id="submit-btn-container">
                            <button className={`w-full px-4 py-2 text-lg bg-blue-700 text-white rounded-md hover:bg-blue-800 ${roboto.className}`}>Order</button>
                    </div>
                </div>
            </div>
    </div>
    )
}



export default CartContainer;