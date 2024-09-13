'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const DonationForm = () => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const { toast } = useToast()

    const [isLoading, setIsLoading] = useState(false);


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



 

    const handlePayment = async () => {
        try {

            setIsLoading(true)
            
            const res = await axios.post('/api/create-donation-order', {
                amount: parseFloat(amount),
                donorName: name,
                donorEmail: email,
                donorEmailPassword: password,
                donorContact: contact,
            })

            toast({
                title: 'Success',
                description: 'Donation order created successfully',
                className: "toast-success"
            })

            console.log("---****---", res)
            const order = res.data;
            console.log("---", order)

            // if (!order.id) {
            //     toast({
            //         title: 'Failed',
            //         description: 'Donation Order creation failed',
            //         className: "toast-error"
            //     })
            // }

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
                    try {
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
                            toast({
                                title: 'Success',
                                description: 'Payment initialization successful',
                                className: "toast-success"
                            })
                        } else {
                            toast({
                                title: 'Failed',
                                description: `Payment initialization failed: ${verificationData.error}`,
                                className: "toast-error"
                            })
                        }
                    } catch (error: any) {
                        alert(`Verification failed: ${error.message}`);
                        toast({
                            title: 'Failed',
                            description: `Verification failed: ${error.message}`,
                            className: "toast-error"
                        })

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

            setIsLoading(false)

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            toast({
                title: 'Failed',
                description: 'Payment initialization failed',
                className: "toast-error"
            })
            setIsLoading(false)
        }
    }
    return (
        <>

            <Head>
                <title>Donate - Green foundation</title>
                <meta name="description" content="This is the donation page of green foundation." />
            </Head>
          



            <div className="flex flex-col md:flex-row justify-evenly min-h-screen items-center gap-6 p-4 bg-[#4cb495]">
                <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
                            Donate
                        </h1>
                        <p className="mb-4 text-lg">
                            Your generosity today plants the seeds for a greener tomorrow. Thank you for making a difference!
                        </p>
                    </div>

                 
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handlePayment();
                        }}
                        className="space-y-8 max-w-md mx-auto"
                    >
                        <div>
                            <label htmlFor="name" className="block text-green-100 font-semibold mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 border-black rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-green-100 font-semibold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 border-black rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300"

                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-green-100 font-semibold mb-2">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 border-black rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300"

                                placeholder="Enter your password"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-green-100 font-semibold mb-2">
                                Contact:
                            </label>
                            <input
                                type="text"
                                id="contact"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 border-black rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300"

                                placeholder="Enter your contact number"
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-green-100 font-semibold mb-2">
                                Amount:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                className="w-full px-4 py-2 border-2 border-black rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors duration-300"

                                placeholder="Enter the amount"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-auto py-2 px-5 bg-green-700 hover:bg-green-300 hover:text-gray-800 text-white rounded-lg transition-colors duration-300"

                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                            ) : (
                                'Donate'
                            )}
                        </button>
                    </form>


                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <img
                        src="donate.png"
                        alt="Donate"
                        className=" h-auto"
                    />
                </div>
            </div>

        </>


    );
};

export default DonationForm;
