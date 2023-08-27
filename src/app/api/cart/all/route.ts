import { NextRequest, NextResponse } from "next/server";
import client from "../../../../../redis/client";
import { cookies } from "next/headers";


interface Product{
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    quantity:number
}

interface Dict{
    [index:string]:string
}


const fetchData = async (id:string,quantity:number):Promise<Product|null>=>{
    try{
        let res = await fetch(`https://fakestoreapi.com/products/${id}`);

        if(!res.ok) throw new Error; 

        let ress = await res.json();

        let cartProduct = {
            ...ress,
            quantity
        } as Product

        return cartProduct;

    }catch(error){
        return null;
    }
}

export async function GET(req:NextRequest){
    try{

        const sid = cookies().get("sid")?.value || '';

        console.log(sid);

        const cartData = await client.hgetall(`cart:${sid}`) as Dict;

        console.log(cartData);

        const data = Object.entries(cartData);
    
        const cartDatas = await Promise.all(data.map(product=>fetchData(product[0],parseInt(product[1])))) as Product[];


        return NextResponse.json(cartDatas);


    }catch(error){
        console.log(error);
        return [];
    }
}