import AddToCart from "@/components/AddToCart";
import RemoveFromCart from "@/components/RemoveFromCart";
import Search from "@/components/Search";
import RemoveProduct from "@/components/admin/RemoveProduct";
import UpdateQuantity from "@/components/admin/UpdateQuantity";
import AddProduct from "@/components/admin/AddProduct";
import Axios from "axios";
import Link from "next/link";
import React from "react";
import AdminSearch from "@/components/admin/AdminSearch";

async function getInventory() {
  const result = await fetch("http://localhost:8080/inventory", {
    cache: "no-store",
  });
  const data = await result.json();
  return data as any[];
}

async function getSearchedInventory(query: string) {
  const result = await fetch(
    `http://localhost:8080/inventory/search?query=${query}`,
    { cache: "no-store" }
  );
  const data = await result.json();
  return data as any[];
}

export interface Product {
  productId: number;
  productName: string;
  color: string;
  category: string;
  price: number;
  quantity: number;
}

async function InventoryPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  console.log(searchParams);
  let inventory;

  if (searchParams.q === undefined || searchParams.q === "") {
    inventory = await getInventory();
  } else {
    inventory = await getSearchedInventory(searchParams.q.toLowerCase());
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <AdminSearch />
        <div className="flex flex-row">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((row: Product, index: number) => {
                console.log(row);
                return <TableRow row={row} index={index} key={index} />;
              })}
            </tbody>
          </table>

          <div className="">
            <AddProduct />
          </div>
        </div>
      </div>
    </>
  );
}

function TableRow({ row, index }: { row: Product; index: number }) {
  return (
    <>
      <tr
        className={
          index % 2 === 0
            ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        }
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <Link href={`/products/${row.productId}`}>{row.productName}</Link>
        </th>
        <td className="px-6 py-4">{row.color}</td>
        <td className="px-6 py-4">{row.category}</td>
        <td className="px-6 py-4">${row.price}</td>
        <td className="px-6 py-4">
          {row.quantity === 0 ? "Currently Unavailable" : row.quantity}
        </td>
        <td className="px-6 py-4 flex">
          <RemoveProduct productId={row.productId} />
          <UpdateQuantity product={row} />
        </td>
      </tr>
    </>
  );
}

export default InventoryPage;
