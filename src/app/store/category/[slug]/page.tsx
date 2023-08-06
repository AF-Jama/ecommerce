import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '../../../../styles/global.module.css';
import Filter from "@/Components/Filter/Filter";
import { Product } from "@/types/types";
import { Urbanist } from "next/font/google";
import { Poppins } from "next/font/google";
import { capitalizeFirstLetter } from "@/utils/utils";

const urbanist = Urbanist({
    weight:["400","700"],
    style:["normal"],
    subsets:["latin"],
    display:'swap'
})

const poppins = Poppins({
    weight:["400","700"],
    style:["normal"],
    subsets:["latin"],
    display:"swap"
})

interface Props{
    params:{
        slug:string
    }
}

const getData =  async (cat:string):Promise<Product[]>=>{
    try{
        let res = await fetch(`https://fakestoreapi.com/products/category/${cat}`);

        if(!res.ok) throw new Error("network error");

        let ress = await res.json() as Promise<Product[]>;

        return ress;
    }catch(error){
        return []
    }
}


const Page:React.FC<Props> = async ({ params }:{ params:{ slug:string }})=>{

    const data = await getData(params.slug);

    return (
        <>
            <div id="home-hero-container" className={`border-8 border-solid rounded-xl text-xl border-white text-center font-bold ${urbanist.className} ${styles.homeHero} aspect-square md:aspect-[2/1] md:text-2xl lg:text-3xl`}>
                <div className="w-full h-full flex flex-col justify-center md:text-3xl">
                    Explore Our Wide Range Of {capitalizeFirstLetter(decodeURI(params.slug))}
                </div>
            </div>

            <Filter/>

            <div id="product-container" className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {data.length===0 && <p className={`${urbanist.className} text-lg`}>No Products in this category</p>}
                {data.map(product=>(
                    <Link href={`/store/product/${product.id}`}>
                        <div id="product-container" className="p-2 border rounded-md hover:opacity-80">
                            <div id="img-container" className="h-48 md:h-60">
                                <Image src={product.image} className={`w-full h-full ${styles.productImage}`} width={500} height={500} alt=""/>
                            </div>

                            {product.title.length>20?<p className="text-lg">{product.title.substring(0,20)}...</p>:<p className="text-lg">{product.title}</p>}
                            <p className="text-sm text-slate-400">{capitalizeFirstLetter(product.category)}</p>
                            <p className="text-base font-bold mt-1">${product.price}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </>
    )
}



export default Page;