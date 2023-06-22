import ModalContainer from "@/components/ModalContainer";
import RemoveFromCart from "@/components/RemoveFromCart";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

var _ = require('lodash');

async function getAllItemsInCart(email: string | null | undefined) {
  const result = await fetch(`http://localhost:8080/cart/${email}`, {
    cache: "no-store",
  });
  const data = await result.json();
  console.log(data);
  return data as any[];
}

async function getCostOfAllItemsInCart(email : string | null | undefined) {
  const result = await fetch(`http://localhost:8080/cart/total/${email}`, {
    cache: "no-store"
  })
  const data = await result.json();

  
  return data;
}

async function itemCountInCart(email : string | null | undefined) {
  const result = await fetch(`http://localhost:8080/cart/itemCount/${email}`, {
    cache: "no-store"
  })
  const data = await result.json();

  return data;
  
}

function currencyFormat(currency : number) : string {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    
  });

  return formatter.format(currency);
}

interface CartProduct {
  cartId: number,
  productId: number,
  productName: string,
  color: string,
  category: string,
  price: number,
  email: string,
  quantity: number
}

async function CartPage() {
  const session = await getServerSession(authOptions);
  const itemsInCart = await getAllItemsInCart(session?.user?.email);
  const itemCount = await itemCountInCart(session?.user?.email);
  const total = await getCostOfAllItemsInCart(session?.user?.email);

  
  


  return (
    <div className="bg-gray-700 flex flex-col items-center">
      <h1 className="text-7xl text-center text-white">Review Your Cart.</h1>
        <div className="flex mt-24">
          <div className="flex flex-col items-center">
            {itemsInCart.map((product : CartProduct, index : number) => {
              return <CartItem product={product} key={index}/>;
            })}
          </div>
          {
          itemCount != 0 ? 
          <div className="ml-10">
            <h1 className="text-3xl text-white mb-2">Order Summary</h1>
            <h2 className="text-white text-xl mb-2">{itemCount} Items: <span className="ml-10 text-2xl">C{currencyFormat(total)}</span></h2>
            <h2 className="text-xl text-orange-400 border-b-2 mb-2">Sales Tax: <span className="ml-10 text-2xl">C{currencyFormat(total * 0.13)}</span></h2>

            <h2 className="text-2xl font-bold text-blue-400">Total: <span className="ml-10 text-2xl">C{currencyFormat(total * 1.13)}</span></h2>
            <ModalContainer email={session?.user?.email}/>
          </div>

          : 
          <>
          <h1 className="text-white text-3xl">No items in Cart Yet! 🛒 Lets get that <Link href="/" className="text-blue-500 underline">bag</Link> full 🛍️</h1>
          </>
          }
        </div>
     </div>
  );
}

function CartItem({ product } : {product: CartProduct}) {
  return (
    <div className="flex text-white text-2xl mb-10">
      <div className="flex border-b">
        <div className="info mr-6">
          <h1 className="font-bold">{product.productName}</h1>
          <h2 className="text-gray-300">{product.color}</h2>

          <h1 className="text-blue-600 mt-3">
            <RemoveFromCart cartId={product.cartId} productId={product.productId} quantity={product.quantity}/>
          </h1>
        </div>

        <div>
          <h1 className="mr-6">Quantity: <span className="text-orange-400">{product.quantity}</span></h1>
        </div>

        <h1>{currencyFormat(product.price)}</h1>
      </div>
    </div>
  );
}

export default CartPage;
