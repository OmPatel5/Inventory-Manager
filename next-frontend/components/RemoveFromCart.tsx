'use client'
import Axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'



function RemoveFromCart({cartId, productId, quantity} : {cartId: number, productId: number, quantity: number}) {
    const router = useRouter();

    async function removeProductFromCart(cartId: number, productId : number, quantity : number) {

        const result = await Axios.delete(`http://localhost:8080/cart/removeFromCart/${cartId}`);

        await Axios.put(`http://localhost:8080/inventory/addQuantity/${productId}`, {
            quantity: quantity
        })
        router.refresh();
    
        return result;
    }

    return (
        <div>
          <button onClick={() => removeProductFromCart(cartId, productId, quantity)} className=' text-blue-500 mb-5'>Remove</button>
        </div>
      )
}

export default RemoveFromCart