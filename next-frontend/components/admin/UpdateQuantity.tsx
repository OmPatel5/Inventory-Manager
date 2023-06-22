'use client';

import { Product } from '@/app/admin/page';
import Axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'



function UpdateQuantity({product} : {product: Product}) {
	const { data: session } = useSession();
	const router = useRouter();


	const decreaseQuantity = async (product: Product) => {
		const result = await Axios.put(`http://localhost:8080/inventory/updateQuantity/${product.productId}`, {
			quantity: product.quantity
		});

		router.refresh();

		return result;
	
	}

	const increaseQuantity = async (product: Product) => {
		const result = await Axios.put(`http://localhost:8080/inventory/increaseQuantity/${product.productId}`, {
			quantity: product.quantity
		})

		router.refresh();
		return result;
	}


  return (
    <div>
        <button onClick={() => increaseQuantity(product)} className='text-2xl'>⬆️</button>
        <button onClick={() => decreaseQuantity(product)} className='text-2xl'>⬇️</button>    
    </div>
  )
}

export default UpdateQuantity