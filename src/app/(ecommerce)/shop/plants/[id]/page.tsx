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
        console.log("=-0987=-=-=", viewProduct)
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



    return (


        <>
            <Head>
                <title>Plant product</title>
                <meta name="description" content="This is the plant product page." />
            </Head>

            <section className='relative  mt-16 py-8 sm:py-20 bg-gray-200'>

                {product.length > 0 ? (
                    <div className="relative container mx-auto p-4 md:p-6 bg-gray-100 rounded-lg shadow-lg border-y-4 border-green-800">
                        {/* Pseudo-element for the blurred background */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                backgroundImage: "url(http://clipart-library.com/images/8izrdA9LT.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                filter: "blur(8px)", // Blur effect for background image
                                zIndex: -1, // Keep the background behind the content
                                opacity: 0.6, // Optional: adjust opacity to make it subtler
                            }}
                        />

                        {/* Responsive Flex Layout */}
                        <div className="relative flex flex-col items-center sm:flex-row  md:space-x-8 gap-5 xl:gap-10 z-10">

                            {/* Left: Product Image and Carousel */}
                            <div className="relative w-full justify-between flex-col flex gap-5 sm:gap-5 xl:gap-10 xl:flex-row sm:flex-col  sm:w-1/2">

                                {/* Main Image */}
                                <div
                                    className="relative hover:shadow-xl shadow-lg w-full h-[200px] sm:[h-210px] md:h-[250px] lg:h-[300] xl:h-[420px] rounded-lg border-y-2 border-green-800 overflow-hidden"

                                    onMouseEnter={() => setHoveredProductId(product[0]._id.toString())}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <img
                                        // src={product[0].images[0]}
                                        src={imgUrl}
                                        alt={product[0].productName}
                                        className={`w-full h-full object-contain rounded-lg transition-opacity duration-500 ${hoveredProductId === product[0]._id.toString() ? 'opacity-100' : 'opacity-100'}`}
                                    />
                                    {/* {product[0].images.slice(1).map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={product[0].productName}
                                            className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-500 ${hoveredProductId === product[0]._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))} */}
                                </div>

                                {/* Image Carousel */}
                                <div className="flex  sm:flex-row  justify-between  xl:mt-0 xl:flex-col">                          

                                    {/* <Carousel plugins={[autoplay.current]} className="w-full lg:w-[80%]"> */}
                                        {/* <CarouselContent> */}
                                            {product[0].images.map((image, index) => (
                                                // <CarouselItem key={index} className="flex-1">
                                                <div key={index} className="">
                                                    <img
                                                        src={image}
                                                        alt={`${product[0].productName} image ${index + 1}`}
                                                        className="h-[80px] md:h-[100px] object-cover rounded-lg border-2 border-green-800 shadow-md transition-transform duration-500 "
                                                        onClick={() => setImgUrl(image)}
                                                    />
                                                </div>
                                            ))}
                                        {/* </CarouselContent> */}
                                        {/* <CarouselPrevious className="hidden lg:block" /> */}
                                        {/* <CarouselNext className="hidden lg:block" /> */}
                                    {/* </Carousel> */}
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div className="w-full sm:w-1/2  lg:mt-0">
                                <h1 className="text-xl lg:text-4xl font-bold lg:font-extrabold text-gray-900 mb-4">{product[0].productName}</h1>
                                <p className=" text-md lg:text-xl text-gray-700 mb-2 sm:mb-4">{product[0].productDesc}</p>
                                <p className=" text:md lg:text-xl text-gray-700 mb-2 sm:mb-2"><strong>Category : </strong> {product[0].category}</p>
                                <p className=" text-md lg:text-xl text-gray-700 mb-4 sm:mb-6"><strong>Subcategory : </strong> {product[0].subCategory}</p>

                                {/* Rating */}
                                <div className="my-4">
                                    <Rating rating={parseFloat(product[0].rating)} />
                                </div>

                                {/* Price */}
                                <div className="flex  sm:flex-row items-center mb-6  space-x-4">
                                    <span className="text-xl lg:text-3xl font-bold text-green-600">${product[0].sellingPrice}</span>
                                    <span className="text-sm lg:text-lg text-gray-500 line-through">${product[0].price}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex  gap-6">
                                    <button
                                        className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold text-sm lg:text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                                        onClick={() => handleAddToCart(product[0])}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold text-sm lg:text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300"
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


            {/* plant care */}
            <section className="bg-gray-300 py-20 sm:py-28">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-gray-800 text-center mb-2">Plant Care Guidelines</h2>
                    <p className="text-md text-gray-700 text-center mb-12 md:max-w-2xl mx-auto">
                        Follow these simple guidelines to ensure your plant thrives and stays healthy.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="https://tse3.mm.bing.net/th?id=OIP.EC8sy5v2RgdoAJdXeIeljQHaE8&pid=Api&P=0&h=180" alt="Sunlight" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Sunlight</h3>
                            <p className="text-gray-600 text-center">Ensure your plant receives adequate sunlight. Most plants require 6-8 hours of direct sunlight daily for optimal growth.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="https://tse4.mm.bing.net/th?id=OIP.6AA3Voe7l6O-NcGRa41ZfgHaE8&pid=Api&P=0&h=180" alt="Watering" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Watering</h3>
                            <p className="text-gray-600 text-center">Water your plant regularly, but avoid overwatering. Check the soil moisture before watering again.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="http://gardeningsoul.com/wp-content/uploads/2017/10/1-51.jpg" alt="Soil" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Soil</h3>
                            <p className="text-gray-600 text-center">Use well-draining soil to prevent root rot. Enrich the soil with organic matter for healthy growth.</p>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="https://i2.wp.com/organiclivestockandcrops.org/wp-content/uploads/2017/10/synthetic-fertilizer-organic-livestock-and-crops-900x560.jpg" alt="Fertilization" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Fertilization</h3>
                            <p className="text-gray-600 text-center">Feed your plant with a balanced fertilizer during the growing season to encourage strong, healthy growth.</p>
                        </div>

                        {/* Card 5 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="https://www.bhg.com/thmb/Vyat6CSM248XjNZ62oV6EJgtrRw=/4000x0/filters:no_upscale():strip_icc()/BHG-Pruning-Roses-100398048-593d5673b2b14156b3eaddf1515c4beb.jpg" alt="Pruning" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Pruning</h3>
                            <p className="text-gray-600 text-center">Regularly prune your plant to remove dead or damaged leaves and promote new growth.</p>
                        </div>

                        {/* Card 6 */}
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border-t-4 border-green-600 duration-300">
                            <img src="https://www.snexplores.org/wp-content/uploads/2022/08/1440_SS_humidity_feat-1380x776.jpg" alt="Humidity" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Humidity</h3>
                            <p className="text-gray-600 text-center">Maintain adequate humidity levels, especially for tropical plants. Mist your plants or use a humidifier if necessary.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* recommended */}
            <section className="py-20 sm:py-28 bg-gray-200">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-gray-800 text-center mb-2">Recommended</h2>
                    <p className="text-md sm:text-lg text-gray-700 text-center mb-8 md:max-w-2xl mx-auto">
                        Explore these recommended products that you'll love just as much!
                    </p>

                    <div className="flex flex-wrap justify-center ">
                        {alsoLikeProducts.map((product) => (
                            <div
                                key={product._id.toString()}
                                className="w-full sm:w-1/2 lg:w-1/4 p-1 pt-3 sm:p-4"
                                onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                                    <div className="relative h-48">
                                        <img
                                            src={product.images[0]}
                                            alt={product.productName}
                                            className={`w-full h-full object-contain transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'
                                                }`}
                                        />
                                        <img
                                            src={product.images[1]}
                                            alt={product.productName}
                                            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                        <Rating rating={parseFloat(product.rating)} />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                            <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                        </div>
                                        <button
                                            className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />


        </>


    );
};

export default Page;
