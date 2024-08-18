'use client'

import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';

const DonationForm = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const handlePayment = async () => {
        // Send data to the backend to create the order
        const res = await axios.post('/api/create-donation-order', {
            amount: parseFloat(amount),
            donorName: name,
            donorEmail: email,
            donorContact: contact,
        })


        console.log("---****---", res)
        const order = res.data;
        console.log("---", order)

        // Razorpay options
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            amount: order.amount,
            currency: order.currency,
            name: 'Green Foundation',
            description: 'Donation',
            order_id: order.id,
            handler: async (response: any) => {
                // Send payment details to backend for verification
                const verificationRes = await fetch('/api/verify-payment', {
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
                } else {
                    alert(`Payment failed: ${verificationData.error}`);
                }
            },
            prefill: {
                name: name,
                email: email,
                contact: contact,
            },
            notes: {
                address: 'Donor Address',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <>

            <Head>
                <title>Donate - Green foundation</title>
                <meta name="description" content="This is the donation page of green foundation." />
                {/* <meta name="keywords" content="home, website, my website" /> */}
            </Head>
            <div className='flex justify-evenly min-h-screen items-center gap-3' style={{
                // backgroundImage: "url('/planting-tree.png')",
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // display:'flex',
                // height:"100vh"
            }}>
                <div className="max-w-md p-8 space-y-8 w-[40%] glass-coflex justify-evenly min-h-screen items-center gap-3ntainer overflow-hidden rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
                            Donate
                        </h1>
                        <p className="mb-4">
                            Your generosity today plants the seeds for a greener tomorrow. Thank you for making a difference!
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePayment();
                        }}

                        className="max-w-md glass-container mx-auto bg-white shadow-lg rounded-lg p-8 m-auto border border-green-500"
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-green-800 font-bold mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-green-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-green-800 font-bold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-green-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact" className="block text-green-800 font-bold mb-2">
                                Contact:
                            </label>
                            <input
                                type="text"
                                id="contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-green-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="amount" className="block text-green-800 font-bold mb-2">
                                Amount:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-green-500 rounded-lg  focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-300 transition-colors"
                        >
                            Donate
                        </button>
                    </form>
                </div>
            </div>

        </>


    );
};

export default DonationForm;
