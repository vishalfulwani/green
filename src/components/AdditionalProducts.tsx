
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
import ProductCard from './ProductCard';

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

            <section className="py-5 bg-gray-50 sm:border-t-2 mt-1 md:border-green-700 w-full rounded-xl">
                <div className="sm:container sm:px-4 md:px-6 text-center">
                    {/* <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">Best Sellers</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12 text-gray-700">
                        Browse our best-selling products and start shopping now!
                    </p> */}

                    <div className="w-full flex justify-center items-center flex-wrap">
                        {isSubmitting ? (
                            <p className="text-xl text-green-900 font-semibold">Loading...</p>
                        ) : (
                            bestSellerProducts.map((product) => (
                                <ProductCard
                                key={product._id.toString()}
                                product={product}
                                hoveredProductId={hoveredProductId}
                                setHoveredProductId={setHoveredProductId}
                                handleAddToCart={handleAddToCart}
                                goToProductPage={goToProductPage}
                              />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
