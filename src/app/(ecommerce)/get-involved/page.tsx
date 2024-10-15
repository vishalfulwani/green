

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
import WishlistButton from '@/components/wishlistButton';


import Image from 'next/image';
import Testimonials from '@/components/Testimonials';

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
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    const bannerAutoplay = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    const bestSellerAutoplay = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )
    const customerAutoplay = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )



    const handleClick = (href: any) => {
        router.push(href);
    };


    // to dyanamic  routing page
    const goToProductPage = (category: string, id: string) => {
        router.push(`/shop/${category}/${id}`);
    };

    useEffect(() => {
        toast({
            title: " Free delivery on order above 500&nbsp;&nbsp;|&nbsp;&nbsp;New arrivals just in—shop now for the latest trends!",
            description: "Friday, February 10, 2023 at 5:57 PM",
        })
    }, [])

    return (

        <>
            <Head>
                <title>E-commerce</title>
                <meta name="description" content="This is the E-commerce home page." />
            </Head>





            {/* hero section */}
            <div className="relative pt-16 mt-2 bg-green-700" >
                <Carousel plugins={[bannerAutoplay.current]} className="w-full">
                    <CarouselContent>
                        <CarouselItem className="">
                            <div className="relative w-full   text-white  flex items-center justify-center"
                                style={{
                                    backgroundImage:
                                        "url('https://t3.ftcdn.net/jpg/06/30/64/08/240_F_630640851_7U4Pi3LtcFTiNejvmjWnNsWu6QTkbAJG.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 'calc(100vh - 70px)'

                                }}
                         
                            >
                                <div className="absolute inset-0  bg-green-900/50 backdrop-blur-sm bg-gradient-to-t from-black opacity-60" />
                                <div className="relative z-10 container mx-auto text-center px-4 md:px-0">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                        Welcome to Green E-commerce
                                    </h1>
                                    <p className="text-lg md:text-xl mb-8">
                                        Discover beautiful plants, seeds, and tools for your home garden
                                    </p>

                                    <a
                                        href="/get-involved"
                                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                                    >
                                        Shop Now
                                    </a>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="">
                            <div className="relative w-full   text-white  flex items-center justify-center"
                                style={{
                                    backgroundImage:
                                        "url('https://t3.ftcdn.net/jpg/05/13/73/60/240_F_513736070_UsY44AxaS5gCQBsnYu6gyidPmCuavTcY.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 'calc(100vh - 70px)'
                                }}
                            >
                                <div className="absolute inset-0  bg-green-900/50 backdrop-blur-sm bg-gradient-to-t from-black opacity-60" />
                                <div className="relative z-10 container mx-auto text-center px-4 md:px-0">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                        High-Quality Seeds for Your Garden

                                    </h1>
                                    <p className="text-lg md:text-xl mb-8">
                                        Get the best seeds for a thriving garden

                                    </p>

                                    <a
                                        href="/get-involved"
                                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                                    >
                                        Explore Seeds

                                    </a>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="">
                            <div className="relative w-full   text-white  flex items-center justify-center"

                                style={{
                                    backgroundImage:
                                        "url('https://t3.ftcdn.net/jpg/07/55/02/92/240_F_755029250_DqIzF1nFgH9IWc4H13FCjoxqnSzeEK4R.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 'calc(100vh - 70px)'

                                }}
                            >
                                <div className="absolute inset-0  bg-green-900/50 backdrop-blur-sm bg-gradient-to-t from-black opacity-60" />
                                <div className="relative z-10 container mx-auto text-center px-4 md:px-0">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                        Premium Gardening Tools

                                    </h1>
                                    <p className="text-lg md:text-xl mb-8">
                                        Equip your garden with the right tools

                                    </p>

                                    <a
                                        href="/get-involved"
                                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                                    >
                                        Shop Tools

                                    </a>
                                </div>
                            </div>
                        </CarouselItem>
                        <CarouselItem className="">
                            <div className="relative w-full   text-white  flex items-center justify-center"

                                style={{
                                    backgroundImage:
                                        "url('https://t3.ftcdn.net/jpg/04/90/64/62/240_F_490646267_SVW4BXbbGW8WjxUwYc5m6TRcNV6wABuV.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 'calc(100vh - 70px)'

                                }}
                            >
                                <div className="absolute inset-0  bg-green-900/50 backdrop-blur-sm bg-gradient-to-t from-black opacity-60" />
                                <div className="relative z-10 container mx-auto text-center px-4 md:px-0">
                                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                        Beautiful Indoor Plants


                                    </h1>
                                    <p className="text-lg md:text-xl mb-8">
                                        Bring nature inside with our collection of indoor plants


                                    </p>

                                    <a
                                        href="/get-involved"
                                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                                    >
                                        Shop Indoor Plants


                                    </a>
                                </div>
                            </div>
                        </CarouselItem>    
                    </CarouselContent>
                </Carousel>
            </div>
           
            {/* Featured Products Section */}
            <section className="py-12 md:py-16  bg-gray-200">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Featured Products</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Explore our top picks to bring life and beauty into your garden!
                    </p>
                    <div className="w-full flex justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (
                    //         <Carousel
                    //             plugins={[featureAutoplay.current]}
                    //             className="w-full "
                    //         >
                    //             <CarouselContent >
                    //                 {featuredProducts.map((product, index) => (
                    //                     <CarouselItem className="">
                    //                         <div
                    //                             key={product._id.toString()}
                    //                             className=" p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                    //                             onMouseEnter={() => setHoveredProductId(product._id.toString())}
                    //                             onMouseLeave={() => setHoveredProductId(null)}
                    //                         >
                    //                             {/* <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                    //                                 <img
                    //                                     src={product.images[0]}
                    //                                     alt={product.productName}
                    //                                     className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                    //                                 />
                    //                                 <img
                    //                                     src={product.images[1]}
                    //                                     alt={product.productName}
                    //                                     className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                    //                                 />
                    //                                 <div className="p-4">
                    //                                     <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                    //                                     <div className="flex justify-around my-2 items-center">
                    //                                         <Rating rating={parseFloat(product.rating)} />
                    //                                         <WishlistButton productId={product._id.toString()} />

                    //                                     </div>
                    //                                     <div className="flex justify-between items-center">
                    //                                         <span className="text-3xl font-bold text-green-900">${product.sellingPrice}</span>
                    //                                         <span className="text-sm line-through text-gray-500">${product.price}</span>
                    //                                     </div>
                    //                                     <button
                    //                                         className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                    //                                         onClick={() => handleAddToCart(product)}
                    //                                     >
                    //                                         Add to Cart
                    //                                     </button>
                    //                                     <button
                    //                                         className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                    //                                         onClick={() => goToProductPage(product.category, product._id.toString())}
                    //                                     >
                    //                                         View Product
                    //                                     </button>
                    //                                 </div>
                    //                             </div> */}
                    //                                <div className="bg-white rounded-lg overflow-hidden shadow-xl relative border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
                    //     {/* Primary Image */}
                    //     <img
                    //         src={product.images[0]}
                    //         alt={product.productName}
                    //         className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                    //     />
                    //     {/* Secondary Image */}
                    //     <img
                    //         src={product.images[1]}
                    //         alt={product.productName}
                    //         className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                    //     />
                    //     <div className="p-4 text-left">
                    //         <h3 className="text-lg font-bold text-green-900 mb-2">{product.productName}</h3>
                    //         <div className="flex justify-around my-2 items-center">
                    //             <Rating rating={parseFloat(product.rating)} />
                    //             <WishlistButton productId={product._id.toString()} />
                    //         </div>
                    //         <div className="flex justify-between items-center mb-4">
                    //             <span className="text-3xl font-bold text-green-700">${product.price}</span>
                    //             <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                    //         </div>
                
                    //         {/* Add to Cart Button */}
                    //         <button
                    //             className="mt-4 flex items-center justify-center w-full px-3 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
                    //             onClick={() => handleAddToCart(product)}
                    //         >
                    //             Add to Cart
                    //         </button>
                
                    //         {/* View Product Button, visible on hover */}
                    //         <button
                    //             className="mt-2 flex items-center justify-center w-full px-3 py-2 bg-transparent border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
                    //             onClick={() => goToProductPage(product.category, product._id.toString())}
                    //         >
                    //             View 
                    //         </button>
                    //     </div>
                    // </div>
                    //                         </div>
                    //                     </CarouselItem>
                    //                 ))}
                    //                 {/* </div> */}
                    //             </CarouselContent>
                    //             {/* <CarouselPrevious /> */}
                    //             {/* <CarouselNext /> */}
                    //         </Carousel>
                    <Carousel plugins={[featureAutoplay.current]} className="w-full">
  <CarouselContent>
    {featuredProducts.map((product, index) => (
      <CarouselItem key={product._id.toString()} className="sm-basis-1/2 md:basis-1/3 lg:basis-1/4">
        <div
          className="p-4  "
          onMouseEnter={() => setHoveredProductId(product._id.toString())}
          onMouseLeave={() => setHoveredProductId(null)}
        >
          {/* Product Card */}
          <div className="bg-white rounded-lg overflow-hidden shadow-xl relative border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
            {/* Primary Image */}
            <img
              src={product.images[0]}
              alt={product.productName}
              className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
            />
            {/* Secondary Image */}
            <img
              src={product.images[1]}
              alt={product.productName}
              className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="p-4 text-left">
              <h3 className="text-base sm:text-lg font-bold text-green-900 mb-2">{product.productName}</h3>
              <div className="flex justify-around my-2 items-center">
                <Rating rating={parseFloat(product.rating)} />
                <WishlistButton productId={product._id.toString()} />
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl sm:text-3xl font-bold text-green-700">${product.sellingPrice}</span>
                <span className="text-xs sm:text-sm line-through text-gray-500">${product.price}</span>
              </div>

              {/* Add to Cart Button */}
              <button
                className="mt-4 flex items-center justify-center w-full px-3 py-2 sm:py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

              {/* View Product Button, visible on hover */}
              <button
                className="mt-2  items-center justify-center w-full px-3 py-2 bg-transparent border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
                onClick={() => goToProductPage(product.category, product._id.toString())}
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>





                        )}

                    </div>
                </div>
            </section>

            {/* Best seller Section */}
            <section className="py-12 md:py-16 bg-gray-300 ">
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
                                        // <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                                        //     <div
                                        //         key={product._id.toString()}
                                        //         className=" p-4"
                                        //         onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                        //         onMouseLeave={() => setHoveredProductId(null)}
                                        //     >
                                        //         <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                                        //             <img
                                        //                 src={product.images[0]}
                                        //                 alt={product.productName}
                                        //                 className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                        //             />
                                        //             <img
                                        //                 src={product.images[1]}
                                        //                 alt={product.productName}
                                        //                 className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                        //             />
                                        //             <div className="p-4">
                                        //                 <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                                        
                                        //                 <div className="flex justify-around my-2 items-center">
                                        //                     <Rating rating={parseFloat(product.rating)} />
                                        //                     <WishlistButton productId={product._id.toString()} />

                                        //                 </div>
                                        //                 <div className="flex justify-between items-center">
                                        //                     <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                        //                     <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                        //                 </div>
                                                        
                                        //                 <button
                                        //                     className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                        //                     onClick={() => handleAddToCart(product)}
                                        //                 >
                                        //                     Add to Cart
                                        //                 </button>
                                        //                 <button
                                        //                     className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                        //                     onClick={() => goToProductPage(product.category, product._id.toString())}
                                        //                 >
                                        //                     View Product
                                        //                 </button>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        // </CarouselItem>
                                        <CarouselItem key={product._id.toString()} className="sm-basis-1/2 md:basis-1/3 lg:basis-1/4">
                                        <div
                                          className="p-4  "
                                          onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                          onMouseLeave={() => setHoveredProductId(null)}
                                        >
                                          {/* Product Card */}
                                          <div className="bg-white rounded-lg overflow-hidden shadow-xl relative border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
                                            {/* Primary Image */}
                                            <img
                                              src={product.images[0]}
                                              alt={product.productName}
                                              className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                            />
                                            {/* Secondary Image */}
                                            <img
                                              src={product.images[1]}
                                              alt={product.productName}
                                              className={`w-full h-32 sm:h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                            />
                                            <div className="p-4 text-left">
                                              <h3 className="text-base sm:text-lg font-bold text-green-900 mb-2">{product.productName}</h3>
                                              <div className="flex justify-around my-2 items-center">
                                                <Rating rating={parseFloat(product.rating)} />
                                                <WishlistButton productId={product._id.toString()} />
                                              </div>
                                              <div className="flex justify-between items-center mb-4">
                                                <span className="text-xl sm:text-3xl font-bold text-green-700">${product.sellingPrice}</span>
                                                <span className="text-xs sm:text-sm line-through text-gray-500">${product.price}</span>
                                              </div>
                                
                                              {/* Add to Cart Button */}
                                              <button
                                                className="mt-4 flex items-center justify-center w-full px-3 py-2 sm:py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
                                                onClick={() => handleAddToCart(product)}
                                              >
                                                Add to Cart
                                              </button>
                                
                                              {/* View Product Button, visible on hover */}
                                              <button
                                                className="mt-2  items-center justify-center w-full px-3 py-2 bg-transparent border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
                                                onClick={() => goToProductPage(product.category, product._id.toString())}
                                              >
                                                View Product
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </CarouselItem>
                                    ))}
                                    
                                </CarouselContent>
                                {/* <CarouselPrevious /> */}
                                {/* <CarouselNext /> */}
                            </Carousel>
                        )}

                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 bg-gradient-to-r bg-gray-200 ">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold ">Why Choose Us</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12">
                        Discover why we're the trusted choice for gardeners everywhere!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white text-green-800 border-t-4 border-green-600 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-300">
                            <div className="text-4xl md:text-5xl mb-4">🌱</div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">High-Quality Plants</h3>
                            <p className="text-gray-700">
                                Our plants are carefully selected to ensure they thrive in your home or garden, bringing lasting beauty and joy.
                            </p>
                        </div>
                        <div className="p-6 bg-white text-green-800 rounded-lg  border-t-4 border-green-600 shadow-lg transform hover:-translate-y-2 transition duration-300">
                            <div className="text-4xl md:text-5xl mb-4">🌍</div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4">Eco-Friendly Products</h3>
                            <p className="text-gray-700">
                                We are committed to sustainability, offering products that are not only beautiful but also kind to the planet.
                            </p>
                        </div>
                        <div className="p-6 bg-white text-green-800 rounded-lg border-t-4 border-green-600 shadow-lg transform hover:-translate-y-2 transition duration-300">
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
            {/* <section className="py-12 md:py-16 bg-gray-300">
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
            </section> */}


            <section className="py-12 md:py-16 bg-gray-300 ">
  <div className="container mx-auto px-4 md:px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-900">Shop by Category</h2>
    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12 text-gray-700">
      Browse our categories to find exactly what your garden needs!
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Plants Card */}
      <div
        className="group bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleClick(`/shop/plants`)}
      >
        <div className="h-64 overflow-hidden rounded-lg shadow-md">
          <img
            src="https://cdn-cms.f-static.net/uploads/2039516/2000_5d03e5ca7d540.png"
            alt="Plants"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mt-4 text-green-900">Plants</h3>
      </div>

      {/* Tools Card */}
      <div
        className="group bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleClick(`/shop/tools`)}
      >
        <div className="h-64 overflow-hidden rounded-lg shadow-md">
          <img
            src="https://simplelivingcountrygal.com/wp-content/uploads/2020/03/garden-tools.jpg"
            alt="Tools"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mt-4 text-green-900">Tools</h3>
      </div>

      {/* Seeds Card */}
      <div
        className="group bg-white p-4 md:p-6 border-green-700 border-y-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer"
        onClick={() => handleClick(`/shop/seeds`)}
      >
        <div className="h-64 overflow-hidden rounded-lg shadow-md">
          <img
            src="https://en.bcdn.biz/images/emails_source/60754e30-7240-425b-b7a0-3df325607e1c.jpg"
            alt="Seeds"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mt-4 text-green-900">Seeds</h3>
      </div>
    </div>
  </div>
</section>




            {/* Testimonials Section */}
<section className="py-12 md:py-16 bg-gray-200">
  <div className="container mx-auto px-4 md:px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-green-800">What Our Customers Say</h2>
    <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12 text-gray-700">
      Hear what our happy customers have to say about us!
    </p>

    <div className="w-full flex justify-center items-center">
      <Carousel plugins={[customerAutoplay.current]} className="w-full">
        <CarouselContent>
          {/* Carousel Item 1 */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 md:p-8 rounded-lg border-t-4 border-green-600 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <p className="text-base md:text-lg italic text-gray-600">
                "GreenLife has transformed my home into a green paradise. The quality of their plants is truly unmatched."
              </p>
              <h4 className="mt-4 font-semibold text-green-900">- Jane Doe</h4>
            </div>
          </CarouselItem>

          {/* Carousel Item 2 */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 md:p-8 rounded-lg border-t-4 border-green-600 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <p className="text-base md:text-lg italic text-gray-600">
                "Their selection of rare and unique plants is unmatched. I’m thrilled with my new additions to my garden."
              </p>
              <h4 className="mt-4 font-semibold text-green-900">- Laura Martinez</h4>
            </div>
          </CarouselItem>

          {/* Carousel Item 3 */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 md:p-8 rounded-lg border-t-4 border-green-600 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <p className="text-base md:text-lg italic text-gray-600">
                "I've ordered several times, and each time the plants have exceeded my expectations. Highly recommended!"
              </p>
              <h4 className="mt-4 font-semibold text-green-900">- Daniel Wilson</h4>
            </div>
          </CarouselItem>

          {/* Carousel Item 4 */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 md:p-8 rounded-lg border-t-4 border-green-600 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <p className="text-base md:text-lg italic text-gray-600">
                "The online shopping experience was seamless, and the plant care tips provided were incredibly helpful."
              </p>
              <h4 className="mt-4 font-semibold text-green-900">- Olivia Johnson</h4>
            </div>
          </CarouselItem>

          {/* Carousel Item 5 */}
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="bg-white p-6 md:p-8 rounded-lg border-t-4 border-green-600 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <p className="text-base md:text-lg italic text-gray-600">
                "They offer a fantastic selection of plants and gardening tools. Their customer service is top-notch!"
              </p>
              <h4 className="mt-4 font-semibold text-green-900">- Emily Davis</h4>
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Optional Navigation Controls */}
        {/* Uncomment below if you want controls */}
        {/* <CarouselPrevious className="absolute left-0" />
        <CarouselNext className="absolute right-0" /> */}
      </Carousel>
    </div>
  </div>
</section>








        </>


    );
}



