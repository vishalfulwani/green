'use client'

import { addToCart, ICartItem } from "@/cartRedux/cartSlice"
import Rating from "@/components/Rating"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Autoplay from "embla-carousel-autoplay"
// import { Card, CardContent } from "@/components/ui/card"
import * as React from "react"
import Head from "next/head"
import WishlistButton from "@/components/wishlistButton"



const Page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [toolProducts, setToolProducts] = useState<IProduct[]>([])
    const [subToolProducts, setSubToolProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)
    const [defaultProduct, setDefaultProduct] = useState(true)

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

    // fetching tool products
    useEffect(() => {
        const tools = products.filter((product) => product.category === "tools")
        setToolProducts(tools)
        if (defaultProduct) {
            setSubToolProducts(tools)
            console.log("****", tools)
        }
    }, [products])

    console.log("*====*", subToolProducts)
    console.log("*=000000000=*", toolProducts)


    const onSubCategoryClick = (subCategory: any) => {
        const subTool = toolProducts.filter((product) => product.subCategory === subCategory)
        setSubToolProducts(subTool)
        setDefaultProduct(false)
    }

    const tools = [
        { value: 'hand-tools', label: 'Hand Tools' },
        { value: 'power-tools', label: 'Power Tools' },
        { value: 'watering-tools', label: 'Watering Tools' },
        { value: 'planting-tools', label: 'Planting Tools' },
        { value: 'garden-maintenance', label: 'Garden Maintenance' },
    ]

    const autoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )


    // to dyanamic  routing page
    const goToProductPage = (id: string) => {
        router.push(`/shop/tools/${id}`);
    };

    return (
        <>
            <Head>
                <title>Tools </title>
                <meta name="description" content="This is the tools page." />
            </Head>

            {/* hero section */}
            <section
                className="relative h-screen bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center text-center text-white px-4 md:px-0 bg-no-repeat bg-cover"
                style={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/home-garden-arrangement-with-copy-space_23-2148851371.jpg?ga=GA1.2.716411687.1716966942)',
                }}
            >
        <div className="absolute inset-0 bg-green-900/50 backdrop-blur-sm"></div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg">
                    Tools
                </h1>
            </section>


            {/* sub categories */}
            <section className="py-28  bg-gray-200">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="flex justify-center flex-row items-center gap-4 flex-wrap">

                        {/* <Carousel
                            plugins={[autoplay.current]}
                            className="w-full "
                        >
                            <CarouselContent > */}
                        {tools.map((product, index) => (
                            // <CarouselItem className="md:basis-1/3 lg:basis-1/4 xl::basis-1/5">
                            <div key={index} className="flex flex-col items-center justify-center rounded-full  xl:w-[150px] xl:h-[150px]  bg-white  p-4 border-[6px] border-gray-200 hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
                                style={{
                                    backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/000/390/945/original/vector-green-plant-border.jpg)",
                                    backgroundAttachment: "cover",
                                    boxShadow: "0 0 0 4px white", // Creates the white inner ring
                                }}
                                onClick={() => onSubCategoryClick(product.value)}
                            >
                                <button
                                    className="text-white font-bold"
                                >
                                    {product.label}
                                </button>
                            </div>
                            // </CarouselItem>
                        ))}
                        {/* </div> */}
                        {/* </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel> */}



                    </div>
                </div>


            </section>



            <section className="py-28  bg-gray-300">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Tool Products</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Explore our top picks to bring life and beauty into your garden!
                    </p>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        {!defaultProduct && subToolProducts.length > 0 ? subToolProducts[0].subCategory : ''}
                    </p>
                    <div className="w-full flex flex-wrap justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (

                            subToolProducts.map((product) => (
                                <div
                                    key={product._id.toString()}
                                    className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                    onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-xl relative border-y-4 border-green-700 transform hover:scale-105 transition-transform duration-300 group">
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
                                                className="mt-2  items-center justify-center w-full px-3 py-1 bg-transparent border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300 hidden group-hover:block"
                                                onClick={() => goToProductPage(product._id.toString())}
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


            {/* tool care */}
            <section className="bg-gray-200 py-28">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">Tool Care Guidelines from Green E-commerce</h2>
                    <p className="text-lg text-gray-700 text-center mb-12 md:max-w-2xl mx-auto">
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



        </>
    )
}


export default Page