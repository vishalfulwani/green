

'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Autoplay from "embla-carousel-autoplay"


import { addToCart, ICartItem } from "@/cartRedux/cartSlice"
import Rating from "@/components/Rating"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import getRandomElements from '@/helpers/getRandomElements';
import Head from 'next/head';


export default function Home() {


    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([])
    const [bestSellerProducts, setBestSellerProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

    const { toast } = useToast()
    const router = useRouter()

    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
        const cartItem: ICartItem = {
            product,
            quantity: 0,
        };
        dispatch(addToCart(cartItem));
        toast({
            title: "Success",
            description: "Product added to cart",
            className: "toast-success"
        })
        router.replace('/cart')
    };

    // fetching data
    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                console.log("*************", allProducts)
                const productData = allProducts.data.data as []
                console.log(productData, "*************")
                setProducts(productData)
            } catch (error) {
                console.error("Error fetching products:", error)
            } finally {
                setIsSubmitting(false)
            }
        }

        fetchProducts()
    }, [])


    // Update featured products whenever products are fetched
    useEffect(() => {
        if (products.length > 0) {
            setFeaturedProducts(getRandomElements(products, 5));
            setBestSellerProducts(getRandomElements(products, 5));
        }
    }, [products]);

    // crousal autoplays
    const featureAutoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const bestSellerAutoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const customerAutoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )



    const handleClick = (href: any) => {
        router.push(href);
    };


    // to dyanamic  routing page
    const goToProductPage = (category: string, id: string) => {
        router.push(`/shop/${category}/${id}`);
    };

    return (
        
        <>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="This is the E-commerce home page." />
            </Head>


            {/* hero section */}
            <section className="relative h-screen bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center text-center text-white px-4 md:px-0">
                <div className="space-y-6 md:space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg">
                        Welcome to Green E-commerce
                    </h1>
                    <p className="text-base md:text-lg lg:text-2xl drop-shadow-md">
                        Discover a world of greenery with our exquisite plant collection.
                    </p>
                    <button className="bg-white text-green-800 px-6 py-3 md:px-10 md:py-4 text-sm md:text-lg font-semibold rounded-full hover:bg-green-700 hover:text-white transition">
                        Explore Now
                    </button>
                </div>
            </section>


            {/* Featured Products Section */}
            <section className="py-12 md:py-16  bg-[#9cc09c]">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Featured Products</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Explore our top picks to bring life and beauty into your garden!
                    </p>
                    <div className="w-full flex justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (
                            <Carousel
                                plugins={[featureAutoplay.current]}
                                className="w-full "
                            >
                                <CarouselContent >
                                    {featuredProducts.map((product, index) => (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                            <div
                                                key={product._id.toString()}
                                                className=" p-4"
                                                onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                                onMouseLeave={() => setHoveredProductId(null)}
                                            >
                                                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.productName}
                                                        className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                                    />
                                                    <img
                                                        src={product.images[1]}
                                                        alt={product.productName}
                                                        className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                                        <Rating rating={parseFloat(product.rating)} />
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                                            <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                                        </div>
                                                        {/* <p className="text-green-500 font-bold">${product.price}</p> */}
                                                        <button
                                                            className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                                            onClick={() => handleAddToCart(product)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <button
                                                            className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                                            onClick={() => goToProductPage(product.category, product._id.toString())}
                                                        >
                                                            View Product
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {/* </div> */}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        )}

                    </div>
                </div>
            </section>

            {/* Best seller Section */}
            <section className="py-12 md:py-16 bg-[#d8e6d8] ">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Best Sellers</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Discover our best-selling products loved by gardeners everywhere!
                    </p>
                    <div className="w-full flex justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (
                            <Carousel
                                plugins={[bestSellerAutoplay.current]}
                                className="w-full "
                            >
                                <CarouselContent >
                                    {bestSellerProducts.map((product, index) => (
                                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                            <div
                                                key={product._id.toString()}
                                                className=" p-4"
                                                onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                                onMouseLeave={() => setHoveredProductId(null)}
                                            >
                                                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.productName}
                                                        className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                                    />
                                                    <img
                                                        src={product.images[1]}
                                                        alt={product.productName}
                                                        className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                                        <Rating rating={parseFloat(product.rating)} />
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                                            <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                                        </div>
                                                        {/* <p className="text-green-500 font-bold">${product.price}</p> */}
                                                        <button
                                                            className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                                            onClick={() => handleAddToCart(product)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <button
                                                            className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                                            onClick={() => goToProductPage(product.category, product._id.toString())}
                                                        >
                                                            View Product
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    {/* </div> */}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        )}

                    </div>
                </div>
            </section>







            {/* Why Choose Us Section */}
            <section className="py-16 bg-gradient-to-r bg-[#9cc09c] text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold ">Why Choose Us</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12">
                        Discover why we're the trusted choice for gardeners everywhere!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white text-green-800 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
                            <div className="text-4xl md:text-5xl mb-4">🌱</div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">High-Quality Plants</h3>
                            <p className="text-gray-700">
                                Our plants are carefully selected to ensure they thrive in your home or garden, bringing lasting beauty and joy.
                            </p>
                        </div>
                        <div className="p-6 bg-white text-green-800 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
                            <div className="text-4xl md:text-5xl mb-4">🌍</div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">Eco-Friendly Products</h3>
                            <p className="text-gray-700">
                                We are committed to sustainability, offering products that are not only beautiful but also kind to the planet.
                            </p>
                        </div>
                        <div className="p-6 bg-white text-green-800 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
                            <div className="text-4xl md:text-5xl mb-4">💚</div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">Customer Support</h3>
                            <p className="text-gray-700">
                                Our team is here to support you with personalized advice and care, ensuring your plants thrive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12 md:py-16 bg-[#bee7bb]">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold ">Shop by Category</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12">
                        Browse our categories to find exactly what your garden needs!
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-xl transition" onClick={() => handleClick(`/shop/plants`)} >
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://cdn-cms.f-static.net/uploads/2039516/2000_5d03e5ca7d540.png"
                                    alt="Plants"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold mt-4">Plants</h3>
                        </div>

                        <div className="bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-xl transition" onClick={() => handleClick(`/shop/tools`)}>
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://simplelivingcountrygal.com/wp-content/uploads/2020/03/garden-tools.jpg"
                                    alt="Tools"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold mt-4">Tools</h3>
                        </div>

                        <div className="bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-xl transition" onClick={() => handleClick(`/shop/seeds`)}>
                            <div className="h-64 overflow-hidden">
                                <img
                                    src="https://en.bcdn.biz/images/emails_source/60754e30-7240-425b-b7a0-3df325607e1c.jpg"
                                    alt="Seeds"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold mt-4">Seeds</h3>
                        </div>
                    </div>

                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 md:py-16  bg-gradient-to-b from-[#9cc09c] to-[#7fa87f]">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold ">What Our Customers Say</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12">
                        Hear what our happy customers have to say about us!
                    </p>

                    <div className="w-full flex justify-center items-center ">

                        <Carousel
                            plugins={[customerAutoplay.current]}
                            className="w-full "
                        >
                            <CarouselContent >
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                                        <p className="text-base md:text-lg italic">
                                            "GreenLife has transformed my home into a green paradise. The quality of their plants is truly unmatched."
                                        </p>
                                        <h4 className="mt-4 font-semibold">- Jane Doe</h4>
                                    </div>
                                </CarouselItem>

                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">

                                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                                        <p className="text-base md:text-lg italic">
                                            "Their selection of rare and unique plants is unmatched. I’m thrilled with my new additions to my garden."
                                        </p>
                                        <h4 className="mt-4 font-semibold">- Laura Martinez</h4>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                                        <p className="text-base md:text-lg italic">
                                            "I've ordered several times, and each time the plants have exceeded my expectations. Highly recommended!"
                                        </p>
                                        <h4 className="mt-4 font-semibold">- Daniel Wilson</h4>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                                        <p className="text-base md:text-lg italic">
                                            "The online shopping experience was seamless, and the plant care tips provided were incredibly helpful."
                                        </p>
                                        <h4 className="mt-4 font-semibold">- Olivia Johnson</h4>
                                    </div>
                                </CarouselItem>
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
                                        <p className="text-base md:text-lg italic">
                                            "They offers a fantastic selection of plants and gardening tools. Their customer service is top-notch!"
                                        </p>
                                        <h4 className="mt-4 font-semibold">- Emily Davis</h4>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>





        </>

        
    );
}



