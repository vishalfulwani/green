'use client'


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import React, { useEffect, useState } from 'react';
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Head from 'next/head';
import Footer from '@/components/FoundationFooter';
import FoundationNavbar from '@/components/FoundationNavbar';
import Testimonials from '@/components/Testimonials';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"





const Page = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsSubmitting(true)
      try {
        const allProducts = await axios.get<ApiResponse>('/api/get-sponsor')
        const productData = allProducts.data.data as []
        setSponsors(productData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsSubmitting(false)
      }
    }

    fetchProducts()
  }, [])

  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const sponsorAutoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )


  return (
    <>

      <Head>
        <title>Home Page - Green Foundation</title>
        <meta name="description" content="This is the home page of Green Foundation." />
      </Head>
      <FoundationNavbar />




      {/* hero section */}
      {/* <section
        className=" bg-green-700 mt-16 text-white  flex items-center justify-center w-full xl:max-h-[600px] lg:max-h-[500px] max-h-[500px]"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.webp?a=1&b=1&s=612x612&w=0&k=20&c=WIKBpmpSbwZBW5EEk6ZbXPaji47EUrfhmS5uBxBu9jA=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 'calc(100vh - 70px)'

        }}

      >
        <div className=" inset-0 bg-green-900/50 "></div>
        <div className=" z-10 sm:container px-4 sm:px-auto mx-auto text-center px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold mb-4">
            Plant a Tree, Grow a Future
          </h1>
          <p className="text-lg md:text-xl xl:text-3xl mb-8">
            Join us in our mission to make the world greener, one tree at a time.
          </p>
          <a
            href="/get-involved"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Get Involved
          </a>
        </div>
      </section> */}


      <div
    // className="w-full relative xl:max-h-[600px] mt-16 pt-4 lg:max-h-[500px] max-h-[500px] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-start px-8 py-12"
    className="relative h-screen  w-full xl:max-h-[600px] mt-16 lg:max-h-[500px] max-h-[500px] bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center text-center text-white px-4 md:px-0 bg-no-repeat bg-cover"

    style={{ backgroundImage: `url(https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.webp?a=1&b=1&s=612x612&w=0&k=20&c=WIKBpmpSbwZBW5EEk6ZbXPaji47EUrfhmS5uBxBu9jA=)` }}
  >
        <div className="absolute inset-0 bg-green-900/30 "></div>
   
    <div className=" z-10 sm:container px-4 sm:px-auto mx-auto text-center text-white px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl xl:text-7xl font-bold mb-4">
            Plant a Tree, Grow a Future
          </h1>
          <p className="text-lg md:text-xl xl:text-3xl mb-8">
            Join us in our mission to make the world greener, one tree at a time.
          </p>
          <div className="mt-4 flex justify-center  items-center gap-5">
          <a
            href="/get-involved"
            className=" bg-green-700 max-w-52 w-full text-white rounded-lg font-semibold hover:text-white hover:bg-green-800 px-4 py-2 sm:px-6 sm:py-3 transition duration-300"
          >
            Get Involved
          </a>
          </div>
        </div>
    {/* </div> */}
  </div>










      {/* tree plantation section */}
      <section className="py-28  bg-gray-200 text-center">
        <div className="sm:container px-4 sm:px-auto mx-auto">
          <h2 className="text-xl sm:text-3xl   font-semibold text-green-900 mb-2  md:mb-2">Plant a Tree from the Comfort of Your Home</h2>
          <p className="text-sm md:text-lg mb-14">Make a difference without leaving your house and receive a personalized certificate.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 text-black justify-center">
            {/* Card 1 */}
            <div className="w-full h-[320px] sm:h-[350px] pt-10 bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out sm:hover:scale-105 "
              style={{ backgroundImage: `url('https://img1.picmix.com/output/stamp/normal/9/4/8/4/2274849_44b6a.png')`, backgroundPosition: "right center" }}>
              {/* <div className="w-full h-[280px] sm:h-[300px] bg-white bg-cover bg-right bg-[url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')] bg-right-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out sm:hover:scale-105"> */}

              <img src="https://treesunlimitednj.com/wp-content/uploads/Selecting-Trees-by-Shape.jpg" alt="Choose Tree" className="w-20 h-20 object-cover shadow-md border-4 border-white ring-4 ring-green-800 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Choose Your Tree</h3>
              <p className="text-center px-4 text-sm md:text-base">Select the type of tree you wish to plant. Each tree offers unique benefits and characteristics.</p>
            </div>

            {/* Card 2 */}
            <div className="w-full h-[320px] sm:h-[350px] pt-10 bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out sm:hover:scale-105"
              style={{ backgroundImage: `url('https://img1.picmix.com/output/stamp/normal/9/4/8/4/2274849_44b6a.png')`, backgroundPosition: "right center" }}>
              <img src="https://tse1.mm.bing.net/th?id=OIP.5nJzQeehuqQyzcbU15FviQHaEh&pid=Api&P=0&h=180" alt="Make a Donation" className="w-20 h-20 object-cover shadow-md border-4 border-white ring-4 ring-green-800 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Make a Donation</h3>
              <p className="text-center px-4 text-sm md:text-base">Your donation covers the planting and ongoing care of the tree, helping it grow and thrive.</p>
            </div>

            {/* Card 3 */}
            <div className="w-full h-[320px] sm:h-[350px] pt-10 bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out sm:hover:scale-105"
              style={{ backgroundImage: `url('https://img1.picmix.com/output/stamp/normal/9/4/8/4/2274849_44b6a.png')`, backgroundPosition: "right center" }}>
              <img src="https://cdn.slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-3.jpg" alt="Receive Certificate" className="w-20 h-20 object-cover shadow-md border-4 border-white ring-4 ring-green-800 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Get Your Certificate</h3>
              <p className="text-center px-4 text-sm md:text-base">After your tree is planted, you'll receive a personalized certificate with details about your tree's journey.</p>
            </div>

            {/* Card 4 */}
            <div className="w-full h-[320px] sm:h-[350px] pt-10 bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out sm:hover:scale-105"
              style={{ backgroundImage: `url('https://img1.picmix.com/output/stamp/normal/9/4/8/4/2274849_44b6a.png')`, backgroundPosition: "right center" }}>
              <img src="https://tse3.mm.bing.net/th?id=OIP.QbNt9-K1ZoegDjd5xrZP-wHaEk&pid=Api&P=0&h=180" alt="Track Your Tree" className="w-20 h-20  object-cover shadow-md border-4 border-white ring-4 ring-green-800 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Track Your Tree</h3>
              <p className="text-center px-4 text-sm md:text-base">Get regular updates on your tree's growth, photos, and information about its environmental impact.</p>
            </div>
          </div>
          <div className="mt-16 flex justify-center  items-center gap-5">
            <a href="/plant-tree" className="border-2 border-green-700 bg-green-700 max-w-60 w-full text-white rounded-lg font-semibold hover:text-white hover:bg-green-800 px-4 py-2 sm:px-6 sm:py-3">Plant a Tree Now</a>
            <a href="/learn-more" className="border-2 border-green-700 bg-transparent max-w-60 w-full text-green-700 rounded-lg font-semibold hover:text-white hover:bg-green-700 px-4 py-2 sm:px-6 sm:py-3">Learn More</a>
          </div>
        </div>
      </section>


      {/* Donation utilization section */}
      <section className="relative py-28 bg-gray-100 text-[#333] bg-cover bg-bottom overflow-hidden">
        {/* <div className="absolute inset-0 bg-no-repeat bg-cover bg-bottom filter blur-md" style={{ backgroundImage: `url('https://clipart-library.com/8300/1931/tree-branch-clipart-xl.png')` }}></div> */}

        <div className="relative sm:container px-4 sm:px-auto mx-auto z-10">
          <h2 className="text-xl sm:text-3xl  font-semibold text-green-900 mb-2  text-center">
            How Your Donation Nurtures Growth
          </h2>
          <p className="text-sm sm:text-lg mb-8 text-center">
            Your generous donation plays a crucial role in ensuring the success of every plant. Here's how we use your contribution to nurture and grow your chosen tree or plant:
          </p>

          {/* <!-- Tree trunk and steps sm:container px-4 sm:px-auto --> */}
          <div className="relative flex justify-center">
            {/* <!-- Tree trunk --> */}
            <div className="w-2 bg-green-700 h-full absolute"></div>

            <div className="grid grid-cols-1 gap-12 relative z-10 mt-12 w-full max-w-5xl">
              {/* <!-- Leaves (steps) --> */}
              {/* <!-- Zigzag effect with alternating translate-x classes --> */}
              <div className="relative transform xl:-translate-x-16 bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Preparation</h3>
                <p>We use your donation to prepare the soil and select the ideal location for planting. This includes testing soil quality and adding necessary nutrients to create a thriving environment.</p>
              </div>

              <div className="relative transform xl:translate-x-16 bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Planting</h3>
                <p>Our team carefully plants your tree, ensuring proper spacing and depth. We use high-quality saplings and planting techniques to give your tree the best start.</p>
              </div>

              <div className="relative transform xl:-translate-x-16 bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Ongoing Care</h3>
                <p>Your donation supports regular maintenance, including watering, fertilization, and pest control. We monitor the plant’s health and make adjustments as needed to promote robust growth.</p>
              </div>

              <div className="relative transform xl:translate-x-16 bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Growth Monitoring</h3>
                <p>We track the growth and development of each plant, ensuring it receives the care it needs to mature. Your contribution helps fund this ongoing monitoring and adjustment.</p>
              </div>

              <div className="relative transform xl:-translate-x-16 bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Impact Reporting</h3>
                <p>You’ll receive updates on your plant’s progress, including photos and details about its development. This transparency shows how your donation is making a difference.</p>
              </div>
            </div>
          </div>

          {/* <!-- Call to Action --> */}
          <div className="mt-16 text-center">
            <p className="text-md sm:text-xl mb-6">
              Want to see your impact firsthand? Contribute today and be part of our journey in nurturing the environment.
            </p>
          <div className="mt-16 flex justify-center  items-center gap-5">
            <a href="/donate" className="border-2 border-green-700 bg-green-700 max-w-60 w-full text-white rounded-lg font-semibold hover:text-white hover:bg-green-800 px-4 py-2 sm:px-6 sm:py-3">Donate Now</a>
            </div>
          </div>
        </div>
      </section>


      {/* our mission */}
      <section className="py-28 bg-gray-200">
        <div className="sm:container px-4 sm:px-auto mx-auto text-center  sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl  font-semibold text-green-900 mb-2 ">
            Our Mission
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            We strive to combat climate change and promote environmental sustainability by planting trees and restoring natural habitats. Our mission is to create a greener, healthier planet for future generations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="sm:p-4">
              <div className="overflow-hidden rounded-lg border-t-4 border-green-600 shadow-lg">
                <img
                  src="https://eco-business.imgix.net/uploads/ebmedia/fileuploads/shutterstock_142348369_phil_mangroves_planting.jpg?fit=crop&h=960&ixlib=django-1.2.0&w=1440"
                  alt="Restoring Natural Habitats"
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transform transition duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mt-6">
                Restoring Natural Habitats
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mt-4">
                We work on restoring natural habitats to support biodiversity and create a balance between humans and nature.
              </p>
            </div>

            <div className="sm:p-4">
              <div className="overflow-hidden rounded-lg border-t-4 border-green-600 shadow-lg">
                <img
                  src="https://torontotreeremoval.ninja/wp-content/uploads/plant-a-tree-toronto.jpg"
                  alt="Planting Trees"
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transform transition duration-500 hover:scale-105"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mt-6">
                Planting Trees
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mt-4">
                Our tree planting initiatives reduce carbon emissions, protect ecosystems, and foster involvement.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* sponsor section */}
      <section className="py-28 bg-gray-100 text-[#333] bg-cover bg-bottom">
        <div className="sm:container px-4 sm:px-auto mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl  font-semibold text-green-900 mb-2  text-center">
            Sponsors
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
            We are grateful for the support of our sponsors, who help us make a positive impact on the environment. Their contributions enable us to continue our mission of planting trees and promoting sustainability.
          </p>

          <div className="flex  w-full items-center justify-center">
            <Carousel
              plugins={[sponsorAutoplay.current]}
              className="w-[220px] sm:w-full "
            >
              <CarouselContent >
                {sponsors.map((sponsor: any) => (
                  <CarouselItem className=" sm:basis-1/3 lg:basis-1/3  xl:basis-1/5"   key={sponsor._id}>

                    <div
                      key={sponsor._id}
                      className="relative group bg-white border-t-2 border-green-600 w-[200px] sm:h-[150px] sm:w-[180px] md:w-[220px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden p-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="h-full w-full object-contain"
                      />
                      {/* Optional hover overlay effect */}
                      <div className="absolute inset-0 bg-green-900 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                        <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {sponsor.name}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>

                ))}
              </CarouselContent>
              {/* <CarouselPrevious /> */}
              {/* <CarouselNext /> */}
            </Carousel>
          </div>
        </div>
      </section>


      {/* our impact */}
      <section className="py-28 bg-gray-200">
        <div className="sm:container px-4 sm:px-auto mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl  font-semibold text-green-900 mb-2 ">Our Impact</h2>
          <p className="text-sm sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Together, we have made significant strides in fostering a greener planet. Here’s a look at the positive impact we’ve created.
          </p>
          <div className="flex justify-evenly items-center flex-wrap gap-2">
            {[
              { value: '10K+', label: 'Trees Planted' },
              { value: '500+', label: 'Volunteers' },
              { value: '50+', label: 'Communities Reached' },
              { value: '10+', label: 'Sponsors' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white p-3 w-[280px] sm:p-8 border-t-4 border-green-600 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-green-800 sm:mb-4">{value}</h3>
                <p className="text-lg text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonial  */}
      <section className="py-28 bg-gray-100">
        <div className="sm:container px-4 sm:px-auto mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-green-900 mb-2">What People Are Saying</h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
            Voices from our green warriors
          </p>

          <Carousel
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent>
              {[
                {
                  name: 'John Doe',
                  quote: 'This foundation has truly made a difference in our community. I’m proud to be a part of it!',
                  image: 'https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6833.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                },
                {
                  name: 'Jane Smith',
                  quote: 'Planting trees has never been easier. The team is amazing and very supportive.',
                  image: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                },
                {
                  name: 'Samantha Brown',
                  quote: 'The tree planting process was super simple, and I love seeing the certificate for my contribution!',
                  image: 'https://tse3.mm.bing.net/th?id=OIP.U64OwTZionM0NSNtjIGUqQHaHa&pid=Api&P=0&h=180',
                },
                {
                  name: 'David Wilson',
                  quote: 'This foundation is making a tangible impact on the environment. It feels great to be involved.',
                  image: 'https://img.freepik.com/free-photo/3d-rendering-smiling-man-avatar_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                },
                {
                  name: 'Lisa Thompson',
                  quote: 'The support from the foundation has been incredible. It’s wonderful to see the community come together!',
                  image: 'https://tse2.mm.bing.net/th?id=OIP.jtRO1wyV6uRKzNK-NIQ97AHaHa&pid=Api&P=0&h=180',
                },
                {
                  name: 'Emily Davis',
                  quote: 'Supporting this foundation has been one of the best decisions I’ve made for the environment!',
                  image: 'https://tse1.mm.bing.net/th?id=OIP.bsHMcutqiY30ZLsI31Gf0wHaGt&pid=Api&P=0&h=180',
                },
                {
                  name: 'Chris Lee',
                  quote: 'It’s inspiring to see how many trees we’ve planted together. The impact is real and lasting.',
                  image: 'https://img.freepik.com/free-photo/3d-rendering-cute-guy-avatar_23-2149436185.jpg?size=626&ext=jpg&ga=GA1.2.716411687.1716966942&semt=ais_hybrid',
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className=" lg:basis-1/3 my-10">
                  <div className="bg-white relative border-t-4 border-green-600 p-4 sm:[220px] lg:h-[280px] md:p-6 rounded-lg shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s testimonial`}
                      // className="w-16 h-16 absolute z-10 top-[-30px] left-48 border-4 border-red-700 rounded-full mx-auto mb-4"
                      className="w-20 h-20 absolute z-10 top-[-40px] left-48 border-4 border-white rounded-full mx-auto mb-4
             shadow-[0_0_0_6px_#16a34a, 0_0_0_10px_white]"
                    />
                    <p className="text-base pt-10 md:text-lg italic">
                      "{testimonial.quote}"
                    </p>
                    <h4 className="mt-4 font-semibold">- {testimonial.name}</h4>
                    <div className="flex space-x-1 justify-center items-center">
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.193a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.357 4.193c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.175 0l-3.557 2.58c-.784.57-1.838-.197-1.54-1.118l1.357-4.193a1 1 0 00-.364-1.118L2.708 9.62c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.193z" />
                      </svg>
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.193a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.357 4.193c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.175 0l-3.557 2.58c-.784.57-1.838-.197-1.54-1.118l1.357-4.193a1 1 0 00-.364-1.118L2.708 9.62c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.193z" />
                      </svg>
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.193a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.357 4.193c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.175 0l-3.557 2.58c-.784.57-1.838-.197-1.54-1.118l1.357-4.193a1 1 0 00-.364-1.118L2.708 9.62c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.193z" />
                      </svg>
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.193a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.357 4.193c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.175 0l-3.557 2.58c-.784.57-1.838-.197-1.54-1.118l1.357-4.193a1 1 0 00-.364-1.118L2.708 9.62c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.193z" />
                      </svg>
                      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.193a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.58a1 1 0 00-.364 1.118l1.357 4.193c.3.921-.755 1.688-1.54 1.118l-3.557-2.58a1 1 0 00-1.175 0l-3.557 2.58c-.784.57-1.838-.197-1.54-1.118l1.357-4.193a1 1 0 00-.364-1.118L2.708 9.62c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.357-4.193z" />
                      </svg>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      </section>



      <Footer />

    </>
  );
}

export default Page;
