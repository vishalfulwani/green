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

      const breadcrumbItems = [
        { label: 'Home', href: '/get-involved' },
        { label: 'Plants', href: '/plants' },
    ];

    return (


        <>
            <Head>
                <title>Seed product </title>
                <meta name="description" content="This is the seed product page." />
            </Head>

            <section className='relative  mt-16 py-12 sm:py-20 bg-gray-200'>
                {product.length > 0 ? (
                    <>
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
                    </>

                ) : (
                    <div className="container mx-auto p-4 md:p-6">
                        <p className="text-center text-lg md:text-xl text-gray-500">Loading...</p>
                    </div>
                )}
            </section>

            {/* seed care */}
            <section className="bg-gray-300 py-28">
                <div className="container mx-auto">
                    <h2 className="text-2xl sm:text-4xl font-semibold sm:font-bold text-gray-800 text-center mb-2">Seed Care Guidelines from Green E-commerce</h2>
                    <p className="text-md text-gray-700 text-center mb-12 md:max-w-2xl mx-auto">
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


    );
};

export default Page;
