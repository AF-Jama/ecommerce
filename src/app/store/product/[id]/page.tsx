import React from "react";
import Image from 'next/image';
import { Button } from "@chakra-ui/react";
import CartButton from "@/Components/CartButton/CartButton";
import { Product } from "@/types/types";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation"
import styles from '../../../../styles/global.module.css';
import { Roboto, Urbanist, Inter } from 'next/font/google' 
import { capitalizeFirstLetter } from "@/utils/utils";
import { cookies } from "next/headers";

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

const inter = Inter({ subsets: ['latin'] })

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

    const sid = cookies().get('sid')?.value || ''; // returns sid or empty string

    const data = await getData(params.id);

    if(!data){
        notFound()
    }



    return (
        <>
            <div id="product-container" className="sm:flex p-2">
                <div id="img-container" className="aspect-square rounded-full sm:w-1/2">
                    <Image src={data.image} className={`h-full w-full ${styles.productImage} rounded-md`} width={500} height={500} alt=""/>
                </div>

                <div id="product-info-container" className="sm:w-1/2 sm:ml-2 p-2">
                    <h1 className={`text-xl font-bold ${urbanist.className}`}>{capitalizeFirstLetter(data.title)}</h1>
                    <h1 className={`${roboto.className} text-xl my-1 font-bold`}>${data.price}</h1>
                    <hr  />

                    <p className={`font-bold ${inter.className}`}>Category: <span className={`font-normal ${inter.className}`}>{capitalizeFirstLetter(data.category)}</span></p>

                    <div id="cart-btn">
                        <CartButton title={data.title} sessionId={sid} id={data.id}/>
                    </div>
                </div>
            </div>

            <hr className="w-[95%] mx-auto" />

            <h1 className={`m-2 text-3xl font-bold ${urbanist.className}`}>Related Products</h1>

                
        </>
    )
}



export default Page;