'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IProduct } from '@/models/product.models';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart, ICartItem } from '@/cartRedux/cartSlice';
import { ApiResponse } from '@/helpers/ApiResponse';
import Rating from '@/components/Rating';
import getRandomElements from '@/helpers/getRandomElements';
import Testimonials from '@/components/Testimonials';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Head from 'next/head';
import WishlistButton from '@/components/wishlistButton';
import ProductCard from '@/components/ProductCard';
import BackToTopButton from '@/components/BackToTopButton';



const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [product, setProduct] = useState<IProduct[]>([])
    const [alsoLikeProducts, setAlsoLikeProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

    const [imgUrl, setImgUrl] = useState<string>("")


    const { id } = useParams();
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


    useEffect(() => {
        const viewProduct = products.filter((product) => product._id.toString() === id)
        setProduct(viewProduct)
        if (viewProduct.length > 0) {
            setImgUrl(viewProduct[0].images[0] || "")
        }

    }, [products])

    useEffect(() => {
        if (products.length > 0) {
            setAlsoLikeProducts(getRandomElements(products, 8));
        }
    }, [products]);

    const autoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const goToProductPage = (category: string, id: string) => {
        router.push(`/shop/${category}/${id}`);
      };

    return (


        <>
            <Head>
                <title>Tool product</title>
                <meta name="description" content="This is the tool product page." />
            </Head>
            <section className='relative  mt-16 py-12 sm:py-20  bg-gray-200'>
                {product.length > 0 ? (
                      <div className="relative md:container mx-auto  ">
                      {/* Pseudo-element for the blurred background */}
                      <div
                        className="absolute inset-0 z-0"
                        style={{
                          backgroundImage: "url(http://clipart-library.com/images/8izrdA9LT.png)",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "blur(10px)",
                          zIndex: -1,
                          opacity: 0.7,
                        }}
                      />
          
                      {/* Responsive Flex Layout */}
                      <div className="relative flex flex-col items-start px-2 sm:px-4 md:px-0 md:flex-row md:space-x-8 gap-6 xl:gap-10 z-10">
                        {/* Left: Product Image and Carousel */}
                        <div className="relative w-full bg-white p-6 border-t-2 m-0 border-green-800 rounded-lg flex flex-col gap-5 sm:gap-5 xl:gap-6  sm:flex-col md:w-7/12">
                          {/* Main Image */}
                          <div
                            className="relative   w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] rounded-lg border- border-green-800 overflow-hidden transition-transform transform hover:scale-105"
                            onMouseEnter={() => setHoveredProductId(product[0]._id.toString())}
                            onMouseLeave={() => setHoveredProductId(null)}
                          >
                            <img
                              src={imgUrl}
                              alt={product[0].productName}
                              className={`w-full h-full object-contain rounded-lg transition-opacity duration-500 ${hoveredProductId === product[0]._id.toString() ? 'opacity-100' : 'opacity-100'}`}
                            />
                          </div>
                          <hr className='m-0' />
          
                          {/* Image Carousel */}
                          <div className="flex sm:flex-row justify-between gap-4 xl:mt-0 xl:flex-col">
                            <Carousel plugins={[autoplay.current]} className=" flex justify-center  lg:w-full">
                              <CarouselContent>
                                {/* Duplicate images to create a looping effect */}
                                {product[0].images.concat(product[0].images).map((image, index) => (
                                  <CarouselItem key={index} className="basis-1/3 xs:basis-1/3 sm:basis-1/3 xl:basis-1/4 2xl:basis-1/5 lg:basis-1/3">
                                    <div className='cursor-pointer'>
                                      <img
                                        src={image}
                                        alt={`${product[0].productName} image ${index + 1}`}
                                        className="h-[80px] md:h-[100px] object-contain rounded-lg border-2 border-green-800 shadow-md transition-transform duration-500 "
                                        onClick={() => setImgUrl(image)}
                                      />
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                            </Carousel>
                          </div>
          
                        </div>
          
                        {/* Right: Product Details */}
                        <div className="w-full bg-white p-6 rounded-lg md:w-5/12 h-full border-t-2 border-green-800  m-0" style={{ "margin": "0" }}>
                          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">{product[0].productName}</h1>
                          <p className="text-md lg:text-xl text-gray-700 mb-4">{product[0].productDesc}</p>
                          <p className="text-md lg:text-xl text-gray-700 mb-2 sm:mb-4"><strong>Category:</strong> {product[0].category}</p>
                          <p className="text-md lg:text-xl text-gray-700 mb-4 sm:mb-6"><strong>Subcategory:</strong> {product[0].subCategory}</p>
          
                          {/* Rating */}
                          <div className="my-4">
                            <Rating rating={parseFloat(product[0].rating)} />
                          </div>
          
                          {/* Price */}
                          <div className="flex items-center mb-6 space-x-4">
                            <span className="text-2xl lg:text-3xl font-bold text-green-600">${product[0].sellingPrice}</span>
                            <span className="text-sm lg:text-lg text-gray-500 line-through">${product[0].price}</span>
                          </div>
          
                          {/* Additional Info */}
                          <div className="text-sm lg:text-lg text-gray-600 mb-6">
                            <p><strong>Product Highlights:</strong></p>
                            <ul className="list-disc pl-6 space-y-2">
                              <li>High-quality materials for durability.</li>
                              <li>Perfect for all types of gardening enthusiasts.</li>
                              <li>Easy to use and maintain.</li>
                            </ul>
                          </div>
          
                          {/* Action Buttons */}
                          <div className="flex gap-6">
                            <button
                              className="mt-2 flex items-center justify-center w-full px-6 py-2 bg-green-600 text-white font-semibold text-sm lg:text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform "
                              onClick={() => handleAddToCart(product[0])}
                            >
                              Add to Cart
                            </button>
                            <button
                              className="mt-2 flex items-center justify-center w-full px-6 py-2 bg-green-600 text-white font-semibold text-sm lg:text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform "
                              onClick={() => handleAddToCart(product[0])}
                            >
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  

                ) : (
                    <div className="container mx-auto p-4 md:p-6">
                        <p className="text-center text-lg md:text-xl text-gray-500">Loading...</p>
                    </div>
                )}
            </section>

            {/* tool care */}
            <section className="bg-gray-300 py-28">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-gray-800 text-center mb-2">Tool Care Guidelines from Green E-commerce</h2>
                    <p className="text-md text-gray-700 text-center mb-12 md:max-w-2xl mx-auto">
                        Keep your gardening tools in top condition with these essential care tips, ensuring they last and perform their best.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
                        {/* <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl border-t-4 border-green-600 transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://www.thespruce.com/thmb/2K-5g62NEC5E9CMEx_TU4NWvTUk=/5538x3692/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-clean-garden-tools-4799140-10-014cca25a6094ee7881805c2ccddadb1.jpg"
                                alt="Tool Cleaning"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Cleaning Tools</h3>
                            <p className="text-gray-600 text-center">
                                Regularly clean your tools after each use. Remove dirt, sap, and moisture to prevent rust and keep them in optimal condition.
                            </p>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl border-t-4 border-green-600 transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://www.thespruce.com/thmb/B__W6hkEBywl0FDW_pr9dThKbhQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sharpening-mower-blade-big-3a358c8dcf65468bbe4705f0a3221dd0.jpg"
                                alt="Tool Sharpening"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Sharpening Tools</h3>
                            <p className="text-gray-600 text-center">
                                Keep your tools sharp for better performance. Regularly sharpen blades, pruners, and shears to make your gardening tasks easier.
                            </p>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://i.pinimg.com/originals/1c/3d/0a/1c3d0a39036444ebeecc3057cc6a40f5.jpg"
                                alt="Tool Storage"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Tool Storage</h3>
                            <p className="text-gray-600 text-center">
                                Store your tools in a dry place. Hanging them on a pegboard or in a tool shed will prolong their life and prevent rusting.
                            </p>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://cdn.notonthehighstreet.com/fs/e0/52/c926-5aef-4079-bf91-18d0cb348a51/original_personalised-father-s-day-garden-tool-set.jpg"
                                alt="Tool Maintenance"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Regular Maintenance</h3>
                            <p className="text-gray-600 text-center">
                                Perform regular maintenance checks on your tools. Tighten any loose screws and oil moving parts to ensure smooth operation.
                            </p>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://tse4.mm.bing.net/th?id=OIP.6CPOBcC1FL7P_JMGwqnelAAAAA&pid=Api&P=0&h=180"
                                alt="Tool Replacement"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Replacing Worn Tools</h3>
                            <p className="text-gray-600 text-center">
                                Replace worn or damaged tools promptly. Investing in quality tools from our store ensures you have the best equipment for your gardening needs.
                            </p>
                        </div>

                        {/* <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl border-t-4 border-green-600 transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://images-na.ssl-images-amazon.com/images/I/81vDkLJ75XL._AC_SL1500_.jpg"
                                alt="Ergonomics"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Ergonomics</h3>
                            <p className="text-gray-600 text-center">
                                Choose ergonomic tools to reduce strain and fatigue. Our selection includes tools designed for comfort and efficiency in your gardening tasks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* recommended */}
            <section className="py-28 bg-gray-200">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-gray-800 text-center mb-2">Recommended</h2>
                    <p className="text-md sm:text-lg text-gray-700 text-center mb-8 md:max-w-2xl mx-auto">
                        Explore these recommended products that you'll love just as much!
                    </p>

                    {/* <div className="flex flex-wrap justify-center "> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">

                        {alsoLikeProducts.map((product) => (
                            // <div
                            //     key={product._id.toString()}
                            //     className="w-full sm:w-1/2 lg:w-1/4 p-1 pt-3 sm:p-4"
                            //     onMouseEnter={() => setHoveredProductId(product._id.toString())}
                            //     onMouseLeave={() => setHoveredProductId(null)}
                            // >
                            //     <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                            //         <div className="relative h-48">
                            //             <img
                            //                 src={product.images[0]}
                            //                 alt={product.productName}
                            //                 className={`w-full h-full object-contain transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'
                            //                     }`}
                            //             />
                            //             <img
                            //                 src={product.images[1]}
                            //                 alt={product.productName}
                            //                 className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'
                            //                     }`}
                            //             />
                            //         </div>
                            //         <div className="p-4">
                            //             <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                            //             <Rating rating={parseFloat(product.rating)} />
                            //             <div className="flex justify-between items-center mt-2">
                            //                 <span className="text-3xl font-bold text-green-900">${product.price}</span>
                            //                 <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                            //             </div>
                            //             <button
                            //                 className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                            //                 onClick={() => handleAddToCart(product)}
                            //             >
                            //                 Add to Cart
                            //             </button>
                            //             <button
                            //                 className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                            //                 onClick={() => handleAddToCart(product)}
                            //             >
                            //                 Buy
                            //             </button>
                            //         </div>
                            //     </div>
                            // </div>
                            <ProductCard
                            key={product._id.toString()}
                            product={product}
                            hoveredProductId={hoveredProductId}
                            setHoveredProductId={setHoveredProductId}
                            handleAddToCart={handleAddToCart}
                            goToProductPage={goToProductPage}
                          />
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />
            <BackToTopButton/>

        </>


    )
};

export default Page;
