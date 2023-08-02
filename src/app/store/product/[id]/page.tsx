import React from "react";
import Image from 'next/image';
import { Button } from "@chakra-ui/react";
import CartButton from "@/Components/CartButton/CartButton";
import { Product } from "@/types/types";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation"
import styles from '../../../../styles/global.module.css';
import { Roboto, Urbanist } from 'next/font/google' 
import { capitalizeFirstLetter } from "@/utils/utils";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const urbanist = Urbanist({
    weight:["400","700"],
    style:["normal"],
    subsets:["latin"],
    display:'swap'
})

interface Props{
    params:{
        id:string
    }
}

const getData = async (id:string):Promise<Product|null>=>{
    try{
        let res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if(!res.ok) throw new Error;

        let ress = await res.json() as Promise<Product>;

        return ress;
    }catch(error){
        return null;
    }
}


const Page:React.FC<Props> = async ({ params }: { params: { id:string } })=>{

    const data = await getData(params.id);

    if(!data){
        notFound()
    }



    return (
        <>
            <div id="product-container" className="md:flex">
                <div id="img-container" className="h-96 md:w-1/2">
                    <Image src={data.image} className={`h-full w-full ${styles.productImage} rounded-md border-2 border-red-600`} width={500} height={500} alt=""/>
                </div>

                <div id="product-info-container" className="md:w-1/2">
                    <h1 className={`text-xl font-bold ${urbanist.className}`}>{capitalizeFirstLetter(data.title)}</h1>
                    <h1 className={`${roboto.className} text-xl my-1 font-bold`}>${data.price}</h1>
                    <hr  />

                    <p><span className={`font-bold text-sm mx-1 ${roboto.className}`}>Category:</span>{capitalizeFirstLetter(data.category)}</p>

                    <div id="cart-btn">
                        <CartButton/>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Page;