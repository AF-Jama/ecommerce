import React from "react";
import CartItem from "@/Components/CartItem/CartItem";
import AddItem from "@/Components/AddItem/AddItem";


const Page:React.FC = ()=>{






    return (
        <>
            <div className="mt-10 border">
                <h2 className="text-2xl font-semibold">Shopping Cart</h2>

                <div id="products-cart-container" className="md:grid md:grid-cols-6">
                    <div id="cart-container" className="md:col-start-1 md:col-end-4">
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                    </div>

                    <div id="cart-total-container" className="bg-gray-50 md:col-start-5 md:col-end-7">
                        <div>
                            Order Summary
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <p>Order Total</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Page;