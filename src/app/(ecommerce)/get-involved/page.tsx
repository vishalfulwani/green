

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
import Slider from 'react-slick';

import Image from 'next/image';
// import Testimonials from '@/components/Testimonials';
import dynamic from 'next/dynamic';
import CustomSlider from '@/components/CustomSlider';
import ProductCard from '@/components/ProductCard';
import BenefitsSection from '@/components/BenefitsSection';
import ShopCategory from '@/components/ShopCategory';
import BackToTopButton from '@/components/BackToTopButton';
import RecentlyViewed from '@/components/RecentlyViewed';

const Testimonials = dynamic(() => import("../../../components/Testimonials"), {
  ssr: false
})


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

  // useEffect(() => {
  //   toast({
  //     title: " Free delivery on order above 500  |  New arrivals just in—shop now for the latest trends!",
  //     className: "correct"
  //   })
  // }, [])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (


    <>
      <Head>
        <title>E-commerce</title>
        <meta name="description" content="This is the E-commerce home page." />
      </Head>


      {/* header slider */}
      <div className="pt-16 mt-2 " >
        <CustomSlider />
      </div>

      {/* benifits section  */}
      <section className="lg:pt-20 py-10 pb-0 lg:pb-10  bg-gray-50">
        <BenefitsSection />
        <ShopCategory />
      </section>

      {/* Featured Products Section */}
      <section className="py-28  bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold  ">Featured Products</h2>
          <p className="text-center text-base md:text-lg lg:text-xl mt-2 mb-8 md:mb-12">
            Explore our top picks to bring life and beauty into your garden!
          </p>
          <div className="w-full flex justify-center items-center ">

            {isSubmitting ? (
              <p>Loading...</p>
            ) : (
              <Carousel plugins={[featureAutoplay.current]} className="w-[300px]  sm:w-[380px] lg:w-full  ">
                <CarouselContent>
                  {featuredProducts.map((product, index) => (
                    <CarouselItem key={product._id.toString()} className="sm-basis-1/2 xl:basis-1/4 lg:basis-1/3">
                      <ProductCard
                        key={product._id.toString()}
                        product={product}
                        hoveredProductId={hoveredProductId}
                        setHoveredProductId={setHoveredProductId}
                        handleAddToCart={handleAddToCart}
                        goToProductPage={goToProductPage}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            )}

          </div>
        </div>
      </section>


      {/* Best seller Section */}
      <section className="py-28 bg-gray-200 ">
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
                className="w-[300px]  sm:w-[380px]  lg:w-full "
              >
                <CarouselContent >
                  {bestSellerProducts.map((product, index) => (
                    <CarouselItem key={product._id.toString()} className="sm-basis-1/2 xl:basis-1/4 lg:basis-1/3">
                      <ProductCard
                        key={product._id.toString()}
                        product={product}
                        hoveredProductId={hoveredProductId}
                        setHoveredProductId={setHoveredProductId}
                        handleAddToCart={handleAddToCart}
                        goToProductPage={goToProductPage}
                      />
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

      <RecentlyViewed/>


      {/* Why Choose Us Section */}
      <section className="py-28  bg-gray-100 ">
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


      {/* Category */}
      <section className="py-28 bg-gray-200 ">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">Shop by Category</h2>
          <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12 text-gray-700">
            Browse our categories to find exactly what your garden needs!
          </p>
          <div className="grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      <Testimonials />
      <BackToTopButton/>
    </>
  );
}



