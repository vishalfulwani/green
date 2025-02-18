'use client'

import Breadcrumb from "@/components/BreadCrumb";
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
import { Loader2 } from "lucide-react";

const Checkout = () => {

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
    //     const storedCart = localStorage.getItem('cart');
    //     if (storedCart) {
    //         const parsedCart: ICartItem[] = JSON.parse(storedCart);
    //         parsedCart.forEach(item => dispatch(addToCart(item)));
    //     }
    // }, [dispatch]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // session
    const { data: session, status } = useSession();
    console.log(session?.platform)
    useEffect(() => {
        console.log(session)
    }, [session]);

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
    const [street, setStreet] = useState<string>(session?.address?.street || "");
    const [city, setCity] = useState<string>(session?.address?.city || "");
    const [state, setState] = useState<string>(session?.address?.state || "");
    const [postalCode, setPostalCode] = useState<string>(session?.address?.postalCode || "");
    const [phone, setPhone] = useState<string>(session?.phone || "");


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

        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        const address = {
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
        };
        const totalAmount = cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
        console.log("00000", totalAmount)

        try {

            const totalAmount = calculateTotal()

            const response = await axios.post('/api/create-buy-order', {
                userId,
                cartItems,
                address,
                totalAmount,
                phone,
                couponCode,
            });
            console.log(totalAmount)

            toast({
                title: "Success",
                description: "Order Created Successfully",
                className: 'toast-success'
            })

            const order = response.data

            // if (!order.id) {
            //   toast({
            //     title: 'Failed',
            //     description: 'Order creation failed',
            //     className: "toast-error"
            //   })
            // }

            // Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: order.amount,
                currency: order.currency,
                name: 'E-commerce',
                description: 'Shopping',
                order_id: order.id,
                handler: async (response: any) => {
                    try {
                        // Send payment details to backend for verification
                        const verificationRes = await fetch('/api/verify-ecommerce-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verificationData = await verificationRes.json();

                        if (verificationRes.ok) {
                            alert('Payment successful!');
                            toast({
                                title: 'Success',
                                description: 'Payment initialization successful',
                                className: "toast-success"
                            })
                        } else {
                            alert(`Payment failed: ${verificationData.error}`);
                            toast({
                                title: 'Failed',
                                description: `Payment initialization failed: ${verificationData.error}`,
                                className: "toast-error"
                            })
                        }
                    } catch (error: any) {
                        toast({
                            title: 'Failed',
                            description: `Verification failed: ${error.message}`,
                            className: "toast-error"
                        })

                    }
                },
                prefill: {
                    userId: userId,
                    phone: phone,
                    address: address
                },
                notes: {
                    address: 'User Address',
                },
                theme: {
                    color: '#3399cc',
                },
            };



            const rzp = new (window as any).Razorpay(options);
            rzp.open();

            handleClearCart()
            setIsLoading(false)

            toast({
                title: "Success",
                description: "Order Placed",
                className: 'toast-success'
            })
            if (discount) {
                updateCoupon()
            }

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Failed",
                description: errorMessage || "Order failed",
                className: 'toast-error'
            })
            setIsLoading(false)
        }
    };


    const breadcrumbItems = [
        { label: 'Home', href: '/get-involved' },
        { label: 'Checkout', href: '/checkout' },
    ];

    return (

        <div className=" min-h-screen mt-16 bg-gray-100   py-14 ">
            <div className="md:container">
                {/* Header */}
                <div className="md:px-0 sm:px-4 px-2">
                <Breadcrumb items={breadcrumbItems} />
                </div>


                {/* Main Content */}
                <div className=" md:px-0 flex flex-col-reverse px-2 sm:px-4 lg:grid lg:grid-cols-12 lg:gap-6">
                    {/* Left Section */}
                    <div className="lg:col-span-8  ">


                        {/* Secure Checkout */}
                        <div>
                            {/* Contact Information */}
                            <div className="mb-4 bg-white p-4 rounded-lg shadow-md border-t-2 border-green-700">
                                {/* <h2 className="text-lg font-semibold mb-4 text-gray-700">Secure Checkout</h2> */}
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">Contact Information</h3>
                                <input
                                    type="email"
                                    className="w-full border  border-gray-300 rounded-lg py-2 px-3 mb-4 focus:ring-gray-200 focus:border-green-500"
                                    placeholder="Enter your email"
                                    value={session?.user.email || ""}
                                    readOnly
                                />
                                <label className="flex items-center mb-2 text-gray-500 space-x-2">
                                    {/* <input type="checkbox" className="rounded border-gray-300" /> */}
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4  rounded  cursor-pointer"
                                    />

                                    <span >Keep me up to date on news and exclusive offers</span>
                                </label>
                            </div>

                            {/* Shipping Information */}
                            {/* <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border-t-2 border-green-700">
                                <h3 className="text-gray-700 font-semibold text-lg mb-4">Shipping Information</h3>

                                <div className="mb-4">
                                    <h2 className="text-sm font-medium text-gray-500">Address</h2>
                                    <p className="text-gray-600">{street}, {city}, {state}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Street</span>
                                        <span className="text-gray-800">{street || "N/A"}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">City</span>
                                        <span className="text-gray-800">{city || "N/A"}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">State</span>
                                        <span className="text-gray-800">{state || "N/A"}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Postal Code</span>
                                        <span className="text-gray-800">{postalCode || "N/A"}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-500">Phone</span>
                                        <span className="text-gray-800">{phone || "N/A"}</span>
                                    </div>
                                </div>
                            </div> */}




                            <div className="bg-white shadow-md rounded-lg p-4 pb-6 space-y-6 border-t-2 border-green-700">
                                <h3 className="text-gray-700 font-semibold text-lg mb-4">Shipping Information</h3>

                                <form
                                    onSubmit={(e) => {
                                        // e.preventDefault();
                                        // handleNextClick();
                                    }}
                                    className="space-y-6"
                                >
                                    {/* Form Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Street */}
                                        <div className="grid gap-2">
                                            <label htmlFor="street" className="block text-gray-700 font-medium">
                                                Street:
                                            </label>
                                            <input
                                                type="text"
                                                id="street"
                                                value={street}
                                                onChange={(e) => setStreet(e.target.value)}
                                                required
                                                placeholder="street name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="grid gap-2">
                                            <label htmlFor="city" className="block text-gray-700 font-medium">
                                                City:
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                value={city}
                                                placeholder="city name"
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                                            />
                                        </div>

                                        {/* State */}
                                        <div className="grid gap-2">
                                            <label htmlFor="state" className="block text-gray-700 font-medium">
                                                State:
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                placeholder="state name"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                                            />
                                        </div>

                                        {/* Postal Code */}
                                        <div className="grid gap-2">
                                            <label htmlFor="postalCode" className="block text-gray-700 font-medium">
                                                Postal Code:
                                            </label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                placeholder="postal code"
                                                value={postalCode}
                                                onChange={(e) => setPostalCode(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <label htmlFor="phone" className="block text-gray-700 font-medium">
                                                Phone No:
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-6 bg-white rounded-lg p-4 mt-4 shadow-md border-t-2 border-green-700">
                                <h3 className="text-gray-700 font-semibold text-lg mb-4">Choose Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="payment" className="rounded-full border-gray-300" />
                                        <span>Credit Card</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="payment" className="rounded-full border-gray-300" />
                                        <span>PayPal</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="payment" className="rounded-full border-gray-300" />
                                        <span>Affirm</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button className="w-auto right px-4 mb-6 bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800"
                                    onClick={handleNextClick}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:col-span-4">
                        <div className="bg-white shadow-md rounded-lg p-6 mb-4 border-t-2 border-green-700">
                            <h2 className="text-gray-700 font-semibold text-lg mb-4">Your Shopping Bag</h2>
                            <div className="space-y-4">

                                {cart.map((item: ICartItem) => (

                                    <div className="flex justify-between" key={item.product._id.toString()}>
                                        <div>
                                            <h4 className="font-medium text-gray-700">{item.product.productName}</h4>
                                            <p className="text-sm text-gray-500">{item.quantity} x {item.product.sellingPrice}</p>
                                        </div>
                                        <p className="font-medium text-gray-700"> ₹{(parseFloat(item.product.sellingPrice) * item.quantity).toFixed(2)}</p>
                                    </div>

                                ))}


                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="font-medium text-gray-700">₹{cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Tax</p>
                                <p className="font-medium text-gray-700">₹0.00</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-gray-700">Coupon</p>
                                <p className="font-medium text-gray-700">-{discount}%</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-lg font-medium text-gray-700">
                                <p>Total</p>
                                <p>₹{cart.reduce((acc, item) => acc + parseFloat(item.product.sellingPrice) * item.quantity, 0).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Checkout;
