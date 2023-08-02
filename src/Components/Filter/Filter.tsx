"use client"
import React, {useState} from "react"
import { useQuery } from "react-query";
import { Product } from "@/types/types";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Urbanist } from "next/font/google";
import { Poppins } from "next/font/google";

const urbanist = Urbanist({
    weight:["400","700"],
    style:["normal"],
    subsets:["latin"],
    display:'swap'
})


const Filter = ()=>{
    const [visibility,setVisibility] = useState(false); // set visibility state 
    // const { data, isLoading,error } = useQuery<Product[],Error>('todos', getTodos);
    // const [ascending,setAscending] = useState<boolean|null>(null); // set ascending state


    return (

        <div id="filter-container">
            <div id="filter-btn-container">
                {/* <button className="bg-red-400 px-4 py-2 rounded-md font-bold">Filter</button> */}
                <Button className="bg-red-500" onClick={e=>setVisibility(!visibility)}>Filter</Button>
            </div>

            <div id="filter-options-container" className={`fixed top-0 bottom-0 right-0 bg-white z-20 ${visibility?"w-44":"hidden"} overflow-hidden duration-1000 py-2`}>
                <h2 className={`${urbanist.className} font-bold px-1`}>Price</h2>   
                <hr className="my-2" />
                <div id="sort-btn-container" className="flex flex-row gap-2 flex-wrap">
                    <div id="asc-btn" className="border rounded-md">
                        <Button className="bg-white hover:text-white hover:bg-black">Low to High</Button>
                    </div>
                    <div id="dec-btn" className="border rounded-md">
                        <Button className="bg-white hover:text-white hover:bg-black">High to Low</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Filter;