"use client";
import Axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";



function AddProduct() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');


  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();


  
    const result = await Axios.post(
      `http://localhost:8080/inventory/createProduct`,
      {
        productName,
        color,
        category,
        price,
        quantity
      }
    );  

    router.refresh();
    return result;
  };


  return (
    <div className="max-w-xs rounded overflow-hidden shadow-2xl w-96 m-10 p-10">
      <h1 className="text-2xl font-semibold">Create a Product</h1>
      <form onSubmit={(e) => addProduct(e)}>
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Product Name
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Color
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />

        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Category
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Price
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Quantity
        </label>
        <input
          type="text"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
