

'use client'

import { addToCart, clearCart, ICartItem, removeFromCart, updateQuantity } from '@/cartRedux/cartSlice';
import { RootState } from '@/cartRedux/store';
import { ApiResponse } from '@/helpers/ApiResponse';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { IUser } from '@/models/user.models';
import AdditionalProducts from '@/components/AdditionalProducts';
import { ImBin2 } from 'react-icons/im';
import Breadcrumb from '@/components/BreadCrumb';



const Page = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState<number>(0);
  const [code, setCode] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [codeMsg, setCodeMsg] = useState('');

  const [userId, setUserId] = useState<string>('');
  const [updateDetail, setUpdateDetail] = useState(0);



  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage when component mounts
  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) {
  //     const parsedCart: ICartItem[] = JSON.parse(storedCart);
  //     parsedCart.forEach(item => dispatch(addToCart(item)));
  //   }
  // }, [dispatch]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };
  

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // session
  // const [userSession, setUserSession] = useState(false)
  const { data: session, status } = useSession();
  console.log(session?.platform)
  useEffect(() => {
    console.log(session)
  }, [session]);

  // apply coupon
  const applyCoupon = async () => {
    try {
      console.log("userrrrr", userId)
      const response = await axios.post('/api/admin/apply-coupon', {
        code,
        userId
      })
      const disc = response.data.data?.discount
      setDiscount(disc)
      console.log("-----", disc)
      calculateTotal()
      const msg = response.data.message
      setCodeMsg(msg)
      setCouponCode(code)

    } catch (error) {
      console.error("Error applying coupon", error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      console.log(`${code} ${errorMessage}`)
      setDiscount(0)
      setCouponCode("")
      setCodeMsg(errorMessage || "Invalid or expired coupon code")
      // setCodeMsg(`${code} ${errorMessage}` || "Invalid or expired coupon code")
    }
  }


  // update coupon
  const updateCoupon = async () => {
    try {
      console.log("userrrrr", userId)
      const response = await axios.post('/api/admin/update-coupon', {
        couponCode,
        userId
      })
      const msg = response.data.message
    } catch (error) {
      console.error("Error applying coupon", error)
    }
  }


  // calculate total amount to pay
  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0);
    const total = subtotal - (subtotal * discount / 100);
    return total.toFixed(2);
  };



  // buy ===================================================================

  // check user logged or not
  // const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const [address, setAddress] = useState<{ street?: string; city?: string; state?: string; postalCode?: string }>({});
  // const [userId, setUserId] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');


  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  // get user
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await axios.get<ApiResponse>('/api/get-all-users')
        const userData = allUsers.data.data as []
        setUsers(userData)

        const you = userData.filter((data: any) => {
          return data?._id.toString() === userId
        })
   
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
    console.log(address, "00000")
  }, [userId, updateDetail])


  const handleBuyClick = () => {
    setIsLoading(true)
    if (!session) {
      router.push('/ecommerce-signin');
    }
    else if (session.platform != 'ecommerce') {
      router.push('/ecommerce-signin');
    } else {
      // setIsPopoverOpen(true);
      setIsLoading(false)
      setUpdateDetail(updateDetail + 1)
      router.push('/checkout');
    }
  };

  useEffect(() => {
    const id = session?.user?._id as string
    setUserId(id)
  }, [])


  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const handleNextClick = async () => {

    setIsLoading(true)
    router.push('/checkout');

    // const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    // const address = {
    //   street: street,
    //   city: city,
    //   state: state,
    //   postalCode: postalCode,
    // };
    // const totalAmount = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
    // console.log("00000", totalAmount)

    // try {

    //   const totalAmount = calculateTotal()

    //   const response = await axios.post('/api/create-buy-order', {
    //     userId,
    //     cartItems,
    //     address,
    //     totalAmount,
    //     phone,
    //     couponCode,
    //   });
    //   console.log(totalAmount)

    //   toast({
    //     title: "Success",
    //     description: "Order Created Successfully",
    //     className: 'toast-success'
    //   })

    //   const order = response.data

    //   // if (!order.id) {
    //   //   toast({
    //   //     title: 'Failed',
    //   //     description: 'Order creation failed',
    //   //     className: "toast-error"
    //   //   })
    //   // }

    //   // Razorpay options
    //   const options = {
    //     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    //     amount: order.amount,
    //     currency: order.currency,
    //     name: 'E-commerce',
    //     description: 'Shopping',
    //     order_id: order.id,
    //     handler: async (response: any) => {
    //       try {
    //         // Send payment details to backend for verification
    //         const verificationRes = await fetch('/api/verify-ecommerce-payment', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({
    //             razorpay_order_id: response.razorpay_order_id,
    //             razorpay_payment_id: response.razorpay_payment_id,
    //             razorpay_signature: response.razorpay_signature,
    //           }),
    //         });

    //         const verificationData = await verificationRes.json();

    //         if (verificationRes.ok) {
    //           alert('Payment successful!');
    //           toast({
    //             title: 'Success',
    //             description: 'Payment initialization successful',
    //             className: "toast-success"
    //           })
    //         } else {
    //           alert(`Payment failed: ${verificationData.error}`);
    //           toast({
    //             title: 'Failed',
    //             description: `Payment initialization failed: ${verificationData.error}`,
    //             className: "toast-error"
    //           })
    //         }
    //       } catch (error: any) {
    //         toast({
    //           title: 'Failed',
    //           description: `Verification failed: ${error.message}`,
    //           className: "toast-error"
    //         })

    //       }
    //     },
    //     prefill: {
    //       userId: userId,
    //       phone: phone,
    //       address: address
    //     },
    //     notes: {
    //       address: 'User Address',
    //     },
    //     theme: {
    //       color: '#3399cc',
    //     },
    //   };



    //   const rzp = new (window as any).Razorpay(options);
    //   rzp.open();

    //   handleClearCart()
    //   setIsLoading(false)

    //   toast({
    //     title: "Success",
    //     description: "Order Placed",
    //     className: 'toast-success'
    //   })
    //   if (discount) {
    //     updateCoupon()
    //   }

    // } catch (error) {
    //   const axiosError = error as AxiosError<ApiResponse>
    //   let errorMessage = axiosError.response?.data.message
    //   toast({
    //     title: "Failed",
    //     description: errorMessage || "Order failed",
    //     className: 'toast-error'
    //   })
    //   setIsLoading(false)
    // }
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/get-involved' },
    { label: 'Cart', href: '/cart' },
  ];


  return (
    <>
      <Head>
        <title>Cart </title>
        <meta name="description" content="This is the cart page." />
      </Head>


      <div className="mt-16 py-14 bg-gray-100 min-h-screen">
        <div className='px-2 sm:container'>
          <Breadcrumb items={breadcrumbItems} />

          <h2 className="text-2xl font-bold mb-1 text-green-800 text-center">Your Cart</h2>
          {cart.length === 0 ? (
            <>
              {/* <p className="text-lg text-gray-600 pb-4">Your cart is empty !. ✨ Check out the fantastic items below </p> */}
              <div className="flex flex-col items-center justify-center text-center py-4">
                <h2 className="text-xl font-semibold text-gray-800">Your cart is currently empty</h2>
                <p className="text-gray-500 mt-2">
                  It looks like you haven't added anything to your cart yet. Explore our store and start adding products to your cart!
                </p>
                <button
                  onClick={() => window.location.href = '/get-involved'}  // Redirect to homepage
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  Go to Homepage
                </button>
              </div>

            </>
          ) : (
     
            <div className='space-y-4 mt-4'>

              {/* Cart Table */}
              <div className="overflow-x-auto border-t-2 border-green-700">
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-200 text-black text-center">
                    <tr>
                      <th className="p-4 border border-gray-200 ">Image</th>
                      <th className="p-4 border border-gray-200 ">Product</th>
                      <th className="p-4 border border-gray-200 ">Price</th>
                      <th className="p-4 border border-gray-200 ">Quantity</th>
                      <th className="p-4 border border-gray-200 ">Total</th>
                      <th className="p-4 border border-gray-200 ">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item: ICartItem) => (

                      <tr key={item.product._id} className="text-center bg-white">

                        <td className="p-4 border border-gray-200">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.productName}
                            className="w-16 h-16 object-cover mx-auto"
                          />
                        </td>
                        <td className="p-4 border border-gray-200">{item.product.productName}</td>
                        <td className="p-4 border border-gray-200">{item.product.sellingPrice}</td>
                        <td className="p-4 border border-gray-200">
                          <input
                            type="number"
                            // defaultValue={1}
                            min={1}
                            value={item.quantity}
                            onChange={(event) => {
                              const value = parseInt(event.target.value, 10);
                              handleQuantityChange(item.product._id, value > 0 ? value : 1); // Ensure value is at least 1
                            }}
                            className="w-16  bg-gray-200 border-gray-300 rounded-md text-center"
                          />
                        </td>
                        
                        <td className="p-4 border border-gray-200">  ₹{(parseFloat(item.product.sellingPrice) * item.quantity).toFixed(2)}</td>
                        <td className="p-4 border border-gray-200">
                          <button className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveFromCart(item.product._id)}
                          >
                            <ImBin2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <div className="text-right mt-4">
                <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                  Update Cart
                </button>
              </div> */}
              </div>

              {/* Coupon and Cart Totals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
                {/* Coupon */}
                <div className="border-t-2 border-green-700">
                  <div className="bg-gray-200 text-black py-3 px-6">
                    <h3 className="font-bold text-lg ">Coupon</h3>
                  </div>
                  <div className="bg-white p-6 ">
                    <p className="text-sm text-gray-800 mb-2">
                      Enter your coupon code if you have one.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Coupon Code"
                        className="w-full p-2  border-gray-300 bg-gray-200 placeholder-black text-black text-md   border-0"
                      />
                      <Button className=" bg-green-600 text-white px-6 py-2 rounded-sm w-max-[180px]   hover:bg-green-700 hover:text-white transition"
                        onClick={() => applyCoupon()}
                      >
                        Apply Coupon
                      </Button>
                    </div>
                    <p className='text-xs  mt-2 py-1'>{codeMsg}</p>
                  </div>
                </div>

                {/* Cart Totals */}
                <div className="border-t-2 border-green-700">
                  <div className="bg-gray-200  text-black py-3 px-6">
                    <h3 className="font-bold text-lg ">Cart Summary</h3>
                  </div>
                  <div className="bg-white  p-6">

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="font-semibold">₹{cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Discount</span>
                        <span className="font-semibold">-{discount}%</span>
                      </div>
                      {/* <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-semibold">
                    ${calculateTotal()}
                    </span>
                  </div> */}
                      <div className="flex justify-end">
                        <button className="text-green-600 text-sm hover:underline">
                          Calculate shipping
                        </button>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-5 justify-between">

                      <Button
                        onClick={handleClearCart}
                        variant="outline"
                        className="w-full bg-white text-green-800 border-2 border-green-600  max-w-40 hover:text-white px-6 py-3 mt-4 rounded-sm hover:bg-green-600  transition"
                      >
                        Clear Cart
                      </Button>
                      <AlertDialog open={isPopoverOpen} >
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" onClick={handleBuyClick} className="w-full bg-green-600 max-w-40 text-white px-6 py-3 mt-4 rounded-sm border-2  border-green-600  hover:bg-white hover:text-green-800 transition">

                            {
                              isLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                </>
                              ) : ('Buy')
                            }
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-center'>Details</AlertDialogTitle>
                            <AlertDialogDescription>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handleNextClick();
                                }}
                                className="space-y-4"
                              >
                                <div>
                                  <label htmlFor="street" className="block text-gray-700 font-medium mb-1">
                                    Street:
                                  </label>
                                  <input
                                    type="text"
                                    id="street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    required
                                    className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="city" className="block text-gray-700 font-medium mb-1">
                                    City:
                                  </label>
                                  <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="state" className="block text-gray-700 font-medium mb-1">
                                    State:
                                  </label>
                                  <input
                                    type="text"
                                    id="state"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                    className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-1">
                                    Postal Code:
                                  </label>
                                  <input
                                    type="text"
                                    id="postalCode"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                                    Phone No:
                                  </label>
                                  <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className=" mr-4 bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm"
                                >
                                  {
                                    isLoading ? (
                                      <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                      </>
                                    ) : ('Next')
                                  }
                                </button>
                                <button
                                  type="button"
                                  className="w-[80px] bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 hover:text-white transition-colors text-sm"
                                  onClick={() => setIsPopoverOpen(false)}
                                >
                                  Cancel
                                </button>
                              </form>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            {/* <AlertDialogCancel onClick={()=>setIsPopoverOpen(false)}>Cancel</AlertDialogCancel> */}
                            {/* <AlertDialogAction className=" bg-green-600 text-white font-bold py-2 px-3 rounded-lg shadow-md hover:bg-green-700 transition-colors text-sm">Continue</AlertDialogAction> */}
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>




    </>
  );
};

export default Page;

