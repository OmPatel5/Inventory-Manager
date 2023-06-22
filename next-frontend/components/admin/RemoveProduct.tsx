"use client"

import Axios from 'axios';
import { useRouter } from 'next/navigation'
import React from 'react'




function RemoveProduct({productId} : {productId: number}) {


  const router = useRouter();


  const removeProduct = async (id : number) => {
    const result = await Axios.delete(`http://localhost:8080/inventory/deleteProduct/${id}`);

		router.refresh();

		return result;
  }

  return (
    <div>
        <button onClick={() => removeProduct(productId)} className='text-2xl'>❌</button>
    </div>
  )
}

export default RemoveProduct