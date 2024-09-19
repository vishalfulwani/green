'use client'

import { ApiResponse } from "@/helpers/ApiResponse";
import { IOrder } from "@/models/order.models";
import { IProduct } from "@/models/product.models";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [orderedProductsWithQuantity, setOrderedProductsWithQuantity] = useState<{ product: any; quantity: number }[]>([]);
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    // Fetch orders only if authenticated and user ID is available
    const fetchOrders = async () => {
      if (status !== "authenticated" || !session?.user?._id) return;

      setIsLoading(true);
      try {
        const response = await axios.get<{ data: IOrder[] }>('/api/get-buy-order', {
          params: {
            userId: session?.user?._id, // Pass userId from session
          },
        });
        const allOrders = response.data.data; // Set orders after fetching
        const userOrders = allOrders.filter(order => order.userId.toString() === session.user._id);
        setOrders(userOrders);

      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchOrders();
      console.log(orders)
    }
  }, [status, session]);


  // fetching all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await axios.get<ApiResponse>('/api/get-products')
        const productData = allProducts.data.data as IProduct[]
        setProducts(productData)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [orders])

  useEffect(() => {
    if (orders && products) {
      // Initialize matchedProductsWithQuantity array within the effect
      const matchedProductsWithQuantity = [] as any;
  
      orders.forEach((order) => {
        order.items.forEach((item) => {
          // Find the matching product for each ordered item
          const product = products.find((p) => String(p._id) === String(item.product));
  
          if (product) {
            // Push product along with its quantity to the matched array
            matchedProductsWithQuantity.push({ product, quantity: item.quantity });
          }
        });
      });
  
      // Update the state with the matched products and their quantities
      setOrderedProductsWithQuantity(matchedProductsWithQuantity);
    }
  }, [orders, products]); // Re-run when orders or products change
  // Re-run when orders or products change


  return (
    <div className=" pt-32 min-h-screen p-6 bg-[#accbb7]">

      <div className="container ">

        {status === "loading" && <div className="text-center text-lg font-semibold">Loading...</div>}
        {status === "unauthenticated" && <div className="text-center text-red-600 text-lg font-semibold">Not signed in</div>}
        {status === "authenticated" && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {session?.user?.userName}</h1>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Platform:</span> {session?.platform}</p>
              <p className="text-gray-600"><span className="font-semibold">Role:</span> {session?.user?.role}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Your Orders</h2>

  {isLoading ? (
    <div className="text-center text-lg font-semibold text-green-600 animate-pulse">Loading orders...</div>
  ) : orderedProductsWithQuantity.length > 0 ? (
    <ul className="space-y-8">
      {orderedProductsWithQuantity.map((item, index) => (
        <li key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Item</h3>
          {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-6">
            <div className="w-[40%]">

            <div className="w-full  h-44 mb-4 sm:mb-0">
              <img
                src={item.product.images[0]} // Assuming the first image is used
                alt={item.product.productName}
                className="w-full h-full object-cover rounded-md border border-gray-300"
              />
            </div>
            </div>

            <div className="flex-grow ">
              <h4 className="text-lg font-bold text-gray-800 mb-2">{item.product.productName}</h4>
              <p className="text-gray-600 text-sm mb-3">{item.product.productDesc}</p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-900">Price:</span> ${item.product.sellingPrice}{" "}
                <span className="line-through text-gray-500">${item.product.price}</span>
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-900">Quantity:</span> {item.quantity}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-900">Category:</span> {item.product.category} /{" "}
                {item.product.subCategory}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-semibold text-gray-900">Address:</span> {item.product.category} /{" "}
                {item.product.subCategory}
              </p>
              <div className="flex items-center text-yellow-500">
                <span className="font-semibold text-gray-900">Rating:</span>
                <span className="ml-2 text-lg">{item.product.rating} ⭐</span>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row sm:space-x-6">
  {/* Image on the left */}
  <div className="w-full sm:w-[40%] mb-4 sm:mb-0">
    <div className="w-full h-44 sm:h-full">
      <img
        src={item.product.images[0]} // Assuming the first image is used
        alt={item.product.productName}
        className="w-full h-full object-cover rounded-md border border-gray-300"
      />
    </div>
  </div>

  {/* Content on the right */}
  <div className="flex-grow">
    <h4 className="text-lg font-bold text-gray-800 mb-2">{item.product.productName}</h4>
    <p className="text-gray-600 text-sm mb-3">{item.product.productDesc}</p>
    <p className="text-gray-700 mb-3">
      <span className="font-semibold text-gray-900">Price:</span> ${item.product.sellingPrice}{" "}
      <span className="line-through text-gray-500">${item.product.price}</span>
    </p>
    <p className="text-gray-700 mb-3">
      <span className="font-semibold text-gray-900">Quantity:</span> {item.quantity}
    </p>
    <p className="text-gray-700 mb-3">
      {/* <span className="font-semibold text-gray-900">Total Cost:</span> {parseInt(item.quantity)*parseInt(item.product.sellingPrice)} */}
      <span className="font-semibold text-gray-900">Total Cost:</span> {Number(item.quantity) * Number(item.product.sellingPrice)}

    </p>
    <p className="text-gray-700 mb-3">
      <span className="font-semibold text-gray-900">Category:</span> {item.product.category} /{" "}
      {item.product.subCategory}
    </p>
    <p className="text-gray-700 mb-3">
      <span className="font-semibold text-gray-900">Address:</span> {item.product.category} /{" "}
      {item.product.subCategory}
    </p>
    <div className="flex items-center text-yellow-500">
      <span className="font-semibold text-gray-900">Rating:</span>
      <span className="ml-2 text-lg">{item.product.rating} ⭐</span>
    </div>
  </div>
</div>

        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500 text-lg">No orders found.</p>
  )}
</div>

          </>
        )}
      </div>
    </div>

  );
};

export default UserProfile;
