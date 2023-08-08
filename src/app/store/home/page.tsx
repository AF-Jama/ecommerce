import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";     
import store from '../../../assets/images/store.jpg';
import Header from "@/Components/Header/Header";
import styles from '../../../styles/global.module.css';
import { capitalizeFirstLetter } from "@/utils/utils";
import { Urbanist } from "next/font/google";
import { Poppins } from "next/font/google";

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

const getCategories = async ()=>{
    try{

        let res = await fetch("https://fakestoreapi.com/products/categories");

        if(!res.ok) throw new Error("Network error");

        res = await res.json();

        return res;

    }catch(error){
        return [];
    }

}


const Page:React.FC = async ()=>{

    // const nextCookies = cookies(); // Get cookies object

    // const token = nextCookies.get('AT'); // Find cookie

    // const tokenValue = token?.value as string;

    // const secret = process.env.JWT_SECRET_KEY as string;

    // jwt.verify(tokenValue, secret, function(err, decoded) {
    //     if(err){
    //         redirect("/login");
    //     }
    // });

    const getCats = await getCategories() as Array<string>;



    return (
        <>
            <div id="home-hero-container" className={`border-8 border-solid rounded-xl text-xl border-white text-center font-bold ${urbanist.className} ${styles.homeHero} aspect-square md:aspect-[2/1] md:text-2xl lg:text-3xl`}>
                <div className="w-full h-full flex flex-col justify-center">
                    Explore Our Wide Range Of Products
                </div>
            </div>

            <h2 className="text-xl mt-1 font-semibold md:text-2xl">Categories</h2>

            <div id="products-container" className="grid grid-cols-2 p-2 md:grid-cols-3 gap-2">
                {
                    getCats.map(cat=>(
                        <Link href={`/store/category/${cat}`} key={cat}>
                            <div className="relative">
                                <div id="img-container" className="h-48 md:h-60">
                                    <Image src={store} className={`h-full w-full opacity-90 hover:opacity-50 hover:transition rounded-xl ${styles.catImage}`} alt=""/>
                                </div>
                                <p className={`text-black absolute top-[50%] left-[50%] translate-x-[-50%] translte-y-[-50%] font-extrabold ${poppins.className}`}>{capitalizeFirstLetter(cat)}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}



export default Page;