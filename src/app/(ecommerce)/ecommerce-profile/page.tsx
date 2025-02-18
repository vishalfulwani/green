'use client'

import AdditionalProducts from "@/components/AdditionalProducts";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IOrder } from "@/models/order.models";
import { IProduct } from "@/models/product.models";
import { IUser } from "@/models/user.models";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const [orderedProductsWithQuantity, setOrderedProductsWithQuantity] = useState<{ product: any; quantity: number }[]>([]);
  // const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>([])


  const { data: session, status, update } = useSession();

  useEffect(() => {
    // Example: Trigger session update whenever needed
    const refreshSession = async () => {
      await update();
    };

    refreshSession(); // Call this when you expect session data to change
  }, []);


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
        setUserId(session?.user?._id)
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






  // user data
  const [user, setUser] = useState<IUser[]>([])
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await axios.get<ApiResponse>('/api/get-all-users')
        const userData = allUsers.data.data as []

        const data = userData.filter((data: any) => data._id === session?.user?._id)

        setUser(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
    console.log("ussser", user)
  }, [])


  return (
    <div className=" py-24 pt-20 min-h-screen sm:p-6 bg-gray-200 mt-16 sm:pt-20">

      <div className="sm:container px-2 ">

        {status === "loading" && <div className="text-center text-lg text-black font-semibold">Loading...</div>}
        {status === "unauthenticated" && <div className="text-center text-red-600 text-lg font-semibold">Not signed in</div>}
        {status === "authenticated" && (
          <>
            <div className="bg-white border-t-2 border-green-700 rounded-lg shadow-md p-6 mb-4 bg-no-repeat bg-right"
              style={{ "backgroundImage": "url(https://images.unsplash.com/photo-1524055988636-436cfa46e59e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxlYWZ8ZW58MHx8MHx8fDA%3D)" }}
            >
              <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {session?.user?.userName}</h1>
              <p className=" mb-2"><span className="font-semibold">Email ID:</span> {session?.user?.email}</p>
              <p className=" mb-2"><span className="font-semibold">Platform:</span> {session?.platform}</p>
              <div className=" mb-4">
                <p className="font-semibold mb-1">Address:</p>
                {session?.address ? (
                  <div className="pl-8">
                    {session?.address?.street && <p>{session.address.street}</p>}
                    {session?.address?.city && session?.address?.state ? (
                      <p>{`${session.address.city}, ${session.address.state}`}</p>
                    ) : (
                      session?.address?.city && <p>{session.address.city}</p>
                    )}
                    {session?.address?.postalCode && <p>{session.address.postalCode}</p>}
                  </div>
                ) : (
                  <p>No Address Available</p>
                )}
              </div>



              {/* <p className="text-gray-600"><span className="font-semibold">Role:</span> {session?.user?.role}</p> */}
            </div>

            <div className="bg-white border-t-2 border-green-700 rounded-lg shadow-lg py-5  mt-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b px-3 md:px-8 pt-3 pb-5">Your Orders</h2>

              {isLoading ? (
                <div className="text-center text-lg font-semibold text-black animate-pulse">Loading orders...</div>
              ) : orderedProductsWithQuantity.length > 0 ? (
                <ul className="space-y-8">
                  {orderedProductsWithQuantity.map((item, index) => (
                    <li key={index} className="bg-[#accbb7] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Item</h3>


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
                          {/* <p className="text-gray-700 mb-3">
      <span className="font-semibold text-gray-900">Address:</span> {user[0].address.street} {" "}
      {user[0].address.city} {"  "} {user[0].address.city} {" , "} {user[0].address.postalCode}
    </p> */}
                          <div className="flex items-center text-yellow-600">
                            <span className="font-semibold text-gray-900">Rating:</span>
                            <span className="ml-2 text-lg">{item.product.rating} ⭐</span>
                          </div>
                        </div>
                      </div>

                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  {/* <p className="text-left text-black p-4 px-4 md:px-8 pt-0 text-lg">It looks like you haven't placed any orders yet. 🌟 Browse our fantastic products below and make your first purchase!</p> */}
                  <div className="flex flex-col items-center justify-center text-center py-4">
                    <h2 className="text-xl font-semibold text-gray-800">You haven't made any purchases yet</h2>
                    <p className="text-gray-500 mt-2">
                      It looks like you haven’t bought anything from us yet. Browse our collection and treat yourself to something special today!
                    </p>
                    <button
                      onClick={() => window.location.href = '/get-involved'}  // Redirect to shop page
                      className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                    >
                      Start Shopping
                    </button>
                  </div>
                </>
              )}
            </div>

          </>
        )}
      </div>
    </div>

  );
};

export default UserProfile;
