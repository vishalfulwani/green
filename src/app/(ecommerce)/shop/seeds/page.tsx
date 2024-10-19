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
import WishlistButton from "@/components/wishlistButton"


const Page = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [seedProducts, setSeedProducts] = useState<IProduct[]>([])
    const [subSeedProducts, setSubSeedProducts] = useState<IProduct[]>([])
    // const [bestSellerProducts, setBestSellerProducts] = useState<IProduct[]>([])
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
        const seeds = products.filter((product) => product.category === "seeds")
        setSeedProducts(seeds)
        if (defaultProduct) {
            setSubSeedProducts(seeds)
            console.log("****", seeds)
        }
    }, [products])

    const onSubCategoryClick = (subCategory: any) => {
        const subSeeds = seedProducts.filter((product) => product.subCategory === subCategory)
        setSubSeedProducts(subSeeds)
        setDefaultProduct(false)
    }

    const seeds = [
        { value: 'vegetable-seeds', label: 'Vegetable Seeds' },
        { value: 'flower-seeds', label: 'Flower Seeds' },
        { value: 'herb-seeds', label: 'Herb Seeds' },
        { value: 'fruit-seeds', label: 'Fruit Seeds' },
        { value: 'grass-seeds', label: 'Grass Seeds' },
    ]

    const autoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    // to dyanamic  routing page
    const goToProductPage = (id: string) => {
        router.push(`/shop/seeds/${id}`);
    };

    return (
        <>

            <Head>
                <title>Seeds </title>
                <meta name="description" content="This is the seeds page." />
            </Head>
            {/* hero section */}
            <section
                className="relative h-screen bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center text-center text-white px-4 md:px-0 bg-no-repeat bg-cover"
                style={{
                    backgroundImage: 'url(https://img.freepik.com/free-photo/flat-lay-assortment-breakfast-cereals_23-2148697620.jpg?ga=GA1.2.716411687.1716966942)',
                }}
            >
        <div className="absolute inset-0 bg-green-900/50 backdrop-blur-sm"></div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight drop-shadow-lg">
                    Seeds
                </h1>
            </section>


            {/* sub categories */}
            <section className="py-28   bg-gray-200">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="flex justify-center flex-row items-center gap-4 flex-wrap">

                        {/* <Carousel
                            plugins={[autoplay.current]}
                            className="w-full "
                        >
                            <CarouselContent > */}
                        {seeds.map((product, index) => (
                            // <CarouselItem className="md:basis-1/3 lg:basis-1/4 xl::basis-1/5">
                            <div key={index} className="flex flex-col items-center justify-center rounded-full  w-[150px] h-[150px]  bg-white  p-4 border-[6px] border-gray-200 hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
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



            <section className="py-28   bg-gray-300">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold  ">Seed Products</h2>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        Explore our top picks to bring life and beauty into your garden!
                    </p>
                    <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
                        {!defaultProduct && subSeedProducts.length > 0 ? subSeedProducts[0].subCategory : ''}
                    </p>
                    <div className="w-full flex justify-center items-center ">

                        {isSubmitting ? (
                            <p>Loading...</p>
                        ) : (
                            subSeedProducts.map((product) => (

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




     {/* seed care */}
     <section className="bg-gray-200 py-28 ">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">Seed Care Guidelines from Green E-commerce</h2>
                    <p className="text-lg text-gray-700 text-center mb-12 md:max-w-2xl mx-auto">
                        Ensure the seeds you purchase from Green E-commerce grow into healthy plants by following these expert tips.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white border-t-4 border-green-600 rounded-lg shadow-md p-6 hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300">
                            <img
                                src="https://tse4.mm.bing.net/th?id=OIP.R4X9ScpYpVt-Rcdn4d4ESgHaEF&pid=Api&P=0&h=180"
                                alt="Seed Selection"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Seed Selection</h3>
                            <p className="text-gray-600 text-center">
                                Choose the best seeds from our collection. We provide high-quality seeds suited to various climates and soil types.
                            </p>
                        </div>

                        <div className="bg-white border-t-4 border-green-600 rounded-lg  shadow-md  hover:shadow-2xl transition-shadow transform hover:scale-105 p-6  duration-300">
                            <img
                                src="https://tse1.mm.bing.net/th?id=OIP.AmYtOLa6AaLyoan43GU31QHaHa&pid=Api&P=0&h=180"
                                alt="Soil Preparation"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Soil Preparation</h3>
                            <p className="text-gray-600 text-center">
                                Prepare your garden with the right soil. Our seed range is compatible with a variety of soil types to ensure successful germination.
                            </p>
                        </div>

                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">
                            <img
                                src="https://tse1.mm.bing.net/th?id=OIP.ood2l0ZdmWMpZzKr4abg6AHaE7&pid=Api&P=0&h=180"
                                alt="Planting Depth"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Planting Depth</h3>
                            <p className="text-gray-600 text-center">
                                Follow our guidelines on planting depth to give your seeds the best start. Correct planting ensures optimal growth.
                            </p>
                        </div>

                        {/* <div className="bg-white border-t-4 border-green-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://tse2.mm.bing.net/th?id=OIP.IJmjuX05ynk9vwVIZ2p5SgHaFj&pid=Api&P=0&h=180"
                                alt="Watering"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Watering</h3>
                            <p className="text-gray-600 text-center">
                                Proper watering is key. Learn how to maintain the right moisture levels for your seeds, ensuring they sprout into healthy plants.
                            </p>
                        </div>

                        {/* <div className="bg-white border-t-4 border-green-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://tse3.mm.bing.net/th?id=OIP.k3KIFvX_J3_MEPTbzBEcIQHaFj&pid=Api&P=0&h=180"
                                alt="Light Exposure"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Light Exposure</h3>
                            <p className="text-gray-600 text-center">
                                Provide your seeds with the right amount of sunlight. Our experts recommend the best light exposure for different seed types.
                            </p>
                        </div>

                        {/* <div className="bg-white border-t-4 border-green-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"> */}
                        <div className="bg-white border-t-4 border-green-600 shadow-md  hover:shadow-2xl  transform hover:scale-105 rounded-lg  p-6  transition-shadow duration-300">

                            <img
                                src="https://tse3.mm.bing.net/th?id=OIP.cq3EMKZVc1MJlNTlhDgRhwHaFj&pid=Api&P=0&h=180"
                                alt="Thinning Seedlings"
                                // className="w-20 h-20 mx-auto mb-4"
                                className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-green-600"
                            />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Thinning Seedlings</h3>
                            <p className="text-gray-600 text-center">
                                After your seeds germinate, thin out the seedlings to ensure they have room to grow. This step is crucial for healthy plants.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default Page