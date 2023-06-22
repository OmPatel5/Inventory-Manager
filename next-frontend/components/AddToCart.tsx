"use client"
import { Product } from '@/app/admin/page';
import Axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'




function AddToCart({ product } : {product: Product}) {

  const { data: session } = useSession();
  const router = useRouter();

  async function addToCart(product : Product) {
    console.log(product)

    const checkProductExists = await Axios.get(`http://localhost:8080/cart/product/${product.productId}/${session?.user?.email}`);
    console.log(checkProductExists); // checks if product exists in the database

    let result;

    if (checkProductExists.data != null) { // if it does exist update the quantity of the item by one in the cart
      result = await Axios.put(`http://localhost:8080/cart/updateQuantity/${product.productId}/${session?.user?.email}/${product.quantity}`, {
        quantity: checkProductExists.data.quantity
      })
    } // if not then add a new entry to database
    else {
      console.log('e')
      result = await Axios.post(`http://localhost:8080/cart/addToCart/${product.quantity}`, {
        productId: product.productId,
        productName: product.productName,
        color: product.color,
        category: product.category,
        price: product.price,
        quantity: 1,
        email: session?.user?.email,
      })

      
    }


    // update quantity in inventory
    if (result.data != null) {
      await Axios.put(`http://localhost:8080/inventory/updateQuantity/${product.productId}`, {
        quantity: product.quantity
      })

    }

    
    router.refresh();
    
    return result;
  }

  return (
    <div>
      <button onClick={() => addToCart(product)} className=' text-blue-500'>Add to Cart</button>
    </div>
  )
}

export default AddToCart