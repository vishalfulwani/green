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
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Head from "next/head"


const Page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [plantProducts, setPlantProducts] = useState<IProduct[]>([])
    const [subPlantProducts, setSubPlantProducts] = useState<IProduct[]>([])
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

    // fetching plant products
    useEffect(() => {
        const plants = products.filter((product) => product.category === "plants")
        setPlantProducts(plants)
        if (defaultProduct) {
            setSubPlantProducts(plants)
            console.log("****", plants)
        }
    }, [products])

    const onSubCategoryClick = (subCategory: any) => {
        const subPlants = plantProducts.filter((product) => product.subCategory === subCategory)
        setSubPlantProducts(subPlants)
        setDefaultProduct(false)
    }

    const plants = [
        { value: 'indoor-plants', label: 'Indoor Plants' },
        { value: 'outdoor-plants', label: 'Outdoor Plants' },
        { value: 'herbs', label: 'Herbs' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'succulents', label: 'Succulents' },
        { value: 'aquatic-plants', label: 'Aquatic Plants' },
        { value: 'medicinal-plants', label: 'Medicinal Plants' },
        { value: 'tropical-plants', label: 'Tropical Plants' },
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
                <title>Plant </title>
                <meta name="description" content="This is the plant page." />
            </Head>
            {/* hero section */}
            <section className="relative h-screen bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center text-center text-white px-4 md:px-0 bg-no-repeat bg-cover ">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg">
                    Plants
                </h1>
            </section >

            {/* sub categories */}
            <section className="py-12 md:py-16  bg-[#9cc09c]">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="flex justify-center flex-row items-center gap-3 flex-wrap">

                        {/* <Carousel
                            plugins={[autoplay.current]}
                            className="w-full "
                        >
                            <CarouselContent > */}
                        {plants.map((product, index) => (
                            // <CarouselItem className="md:basis-1/3 lg:basis-1/4 xl::basis-1/5">
                            <div key={index} className="flex flex-col items-center justify-center rounded-lg  w-[150px] h-[150px]  bg-white  p-4" style={{ backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/000/390/945/original/vector-green-plant-border.jpg)", backgroundAttachment: "cover", }}>
                                <button
                                    onClick={() => onSubCategoryClick(product.value)}
                                    className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
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



            <section className="py-12 md:py-16   bg-[#d8e6d8]">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Plant Products</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Explore our top picks to bring life and beauty into your garden!
                    </p>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        {!defaultProduct && subPlantProducts.length > 0 ? subPlantProducts[0].subCategory : ''}
                    </p>
                    <div className="w-full flex justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (
                            subPlantProducts.map((product) => (

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
                                                onClick={() => goToProductPage(product._id.toString())}
                                            >
                                                View Product
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
    )
}


export default Page