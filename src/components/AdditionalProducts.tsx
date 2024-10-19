
'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Autoplay from "embla-carousel-autoplay";

import { addToCart, ICartItem } from "@/cartRedux/cartSlice";
import Rating from "@/components/Rating";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/helpers/ApiResponse";
import { IProduct } from "@/models/product.models";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import * as React from "react";

import getRandomElements from '@/helpers/getRandomElements';
import Head from 'next/head';
import WishlistButton from '@/components/wishlistButton';

export default function AdditionalProducts() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [bestSellerProducts, setBestSellerProducts] = useState<IProduct[]>([]);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();
    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
                const cartItem: ICartItem = {
                    product,
                    quantity: 1,
                };
                dispatch(addToCart(cartItem));
                toast({
                    title: "Success",
                    description: "Product added to cart",
                    className: "toast-success"
                })
                router.replace('/cart')
            };

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true);
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products');
                const productData = allProducts.data.data as IProduct[];
                setProducts(productData);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsSubmitting(false);
            }
        };

        fetchProducts();
    }, []);

    // Update best sellers when products are fetched
    useEffect(() => {
        if (products.length > 0) {
            setBestSellerProducts(getRandomElements(products, 10));
        }
    }, [products]);

    // Navigate to the product page
    const goToProductPage = (category: string, id: string) => {
        router.push(`/shop/${category}/${id}`);
    };

    return (
        <>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="This is the E-commerce home page." />
            </Head>

            <section className="py-28 bg-gray-100 sm:border-t-4 md:border-green-600 w-full rounded-xl">
                <div className="container sm:px-4 md:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">Best Sellers</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12 text-gray-700">
                        Browse our best-selling products and start shopping now!
                    </p>

                    <div className="w-full flex justify-center items-center flex-wrap">
                        {isSubmitting ? (
                            <p className="text-xl text-green-900 font-semibold">Loading...</p>
                        ) : (
                            bestSellerProducts.map((product) => (
                                <div
                                    key={product._id.toString()}
                                    className="p-4 flex flex-wrap"
                                    onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <div className="bg-white rounded-lg overflow-hidden w-[310px] shadow-xl relative border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
                                        {/* Primary Image */}
                                        <img
                                            src={product.images[0]}
                                            alt={product.productName}
                                            className={`w-full h-48 object-contain transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                        />
                                        {/* Secondary Image */}
                                        <img
                                            src={product.images[1]}
                                            alt={product.productName}
                                            className={`w-full h-48 object-contain transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                        <div className="p-4 text-left">
                                            <h3 className="text-lg font-bold text-green-900 mb-2">{product.productName}</h3>
                                            <div className="flex justify-around my-2 items-center">
                                                <Rating rating={parseFloat(product.rating)} />
                                                <WishlistButton productId={product._id.toString()} />
                                            </div>
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-3xl font-bold text-green-700">${product.price}</span>
                                                <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                className="mt-4 flex items-center justify-center w-full px-3 py-1 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </button>

                                            {/* View Product Button, visible on hover */}
                                            <button
                                                className="mt-2 items-center justify-center w-full px-3 py-1 bg-transparent border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
                                                onClick={() => goToProductPage(product.category, product._id.toString())}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
