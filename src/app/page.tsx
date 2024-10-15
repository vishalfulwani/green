'use client'

import React, { useEffect, useState } from 'react';
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Head from 'next/head';
import Footer from '@/components/FoundationFooter';
import FoundationNavbar from '@/components/FoundationNavbar';




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


  return (
    <>

      <Head>
        <title>Home Page - Green Foundation</title>
        <meta name="description" content="This is the home page of Green Foundation." />
      </Head>
      <FoundationNavbar />




      {/* hero section */}
      <section
        className="relative bg-green-700 mt-16 text-white  flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.webp?a=1&b=1&s=612x612&w=0&k=20&c=WIKBpmpSbwZBW5EEk6ZbXPaji47EUrfhmS5uBxBu9jA=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 'calc(100vh - 70px)' 

        }}
        
      >
        <div className="absolute inset-0 bg-green-900/50 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto text-center px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Plant a Tree, Grow a Future
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Join us in our mission to make the world greener, one tree at a time.
          </p>
          {/* <a
            href="/get-involved"
            className="inline-block button button-green bg-white text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Get Involved
          </a> */}
          <a
            href="/get-involved"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Get Involved
          </a>
        </div>
      </section>










      {/* tree plantation section */}


      <section className="py-16 px-6 bg-gray-200 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6">Plant a Tree from the Comfort of Your Home</h2>
          <p className="text-base md:text-lg mb-8">Make a difference without leaving your house and receive a personalized certificate.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-black justify-center">
            {/* Card 1 */}
            <div className="w-full h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://treesunlimitednj.com/wp-content/uploads/Selecting-Trees-by-Shape.jpg" alt="Choose Tree" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Choose Your Tree</h3>
              <p className="text-center px-4 text-sm md:text-base">Select the type of tree you wish to plant. Each tree offers unique benefits and characteristics.</p>
            </div>

            {/* Card 2 */}
            <div className="w-full h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://tse1.mm.bing.net/th?id=OIP.5nJzQeehuqQyzcbU15FviQHaEh&pid=Api&P=0&h=180" alt="Make a Donation" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Make a Donation</h3>
              <p className="text-center px-4 text-sm md:text-base">Your donation covers the planting and ongoing care of the tree, helping it grow and thrive.</p>
            </div>

            {/* Card 3 */}
            <div className="w-full h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://cdn.slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-3.jpg" alt="Receive Certificate" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Get Your Certificate</h3>
              <p className="text-center px-4 text-sm md:text-base">After your tree is planted, you'll receive a personalized certificate with details about your tree's journey.</p>
            </div>

            {/* Card 4 */}
            <div className="w-full h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-700 transition-transform duration-300 ease-in-out hover:scale-105"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://tse3.mm.bing.net/th?id=OIP.QbNt9-K1ZoegDjd5xrZP-wHaEk&pid=Api&P=0&h=180" alt="Track Your Tree" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-center">Track Your Tree</h3>
              <p className="text-center px-4 text-sm md:text-base">Get regular updates on your tree's growth, photos, and information about its environmental impact.</p>
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-5">
      <a href="/plant-tree" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
        Plant a Tree Now
      </a>
      <a href="/learn-more" className="inline-block bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
        Learn More
      </a>
    </div> */}
          <div className="mt-16 flex justify-center  items-center gap-5">
            <a href="/plant-tree" className="button button-green">Plant a Tree Now</a>
            <a href="/learn-more" className="button button-outline">Learn More</a>
          </div>
        </div>
      </section>








      {/* Donation utilization section */}
      {/* <section className="py-16 px-6 bg-gray-300 text-[#333] bg-cover bg-bottom" style={{ backgroundImage: `url('https://clipart-library.com/8300/1931/tree-branch-clipart-xl.png')` }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-900 mb-4">How Your Donation Nurtures Growth</h2>
          <p className="text-lg mb-6">Your generous donation plays a crucial role in ensuring the success of every plant. Here's how we use your contribution to nurture and grow your chosen tree or plant:</p>

          <div className="grid gap-8">
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Preparation</h3>
              <p>We use your donation to prepare the soil and select the ideal location for planting. This includes testing soil quality and adding necessary nutrients to create a thriving environment.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Planting</h3>
              <p>Our team carefully plants your tree, ensuring proper spacing and depth. We use high-quality saplings and planting techniques to give your tree the best start.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Ongoing Care</h3>
              <p>Your donation supports regular maintenance, including watering, fertilization, and pest control. We monitor the plant’s health and make adjustments as needed to promote robust growth.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Growth Monitoring</h3>
              <p>We track the growth and development of each plant, ensuring it receives the care it needs to mature. Your contribution helps fund this ongoing monitoring and adjustment.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Impact Reporting</h3>
              <p>You’ll receive updates on your plant’s progress, including photos and details about its development. This transparency shows how your donation is making a difference.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl mb-4">Want to see your impact firsthand? Contribute today and be part of our journey in nurturing the environment.</p>
            <a href="/donate" className="button button-green">Donate Now</a>
          </div>
        </div>
      </section> */}
      <section className="relative py-16 px-4 bg-gray-300 text-[#333] bg-cover bg-bottom overflow-hidden">
        <div className="absolute inset-0 bg-no-repeat bg-cover bg-bottom filter blur-md" style={{ backgroundImage: `url('https://clipart-library.com/8300/1931/tree-branch-clipart-xl.png')` }}></div>

        <div className="relative container mx-auto z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6 text-center">How Your Donation Nurtures Growth</h2>
          <p className="text-base sm:text-lg mb-8 text-center">Your generous donation plays a crucial role in ensuring the success of every plant. Here's how we use your contribution to nurture and grow your chosen tree or plant:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Preparation</h3>
              <p>We use your donation to prepare the soil and select the ideal location for planting. This includes testing soil quality and adding necessary nutrients to create a thriving environment.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Planting</h3>
              <p>Our team carefully plants your tree, ensuring proper spacing and depth. We use high-quality saplings and planting techniques to give your tree the best start.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Ongoing Care</h3>
              <p>Your donation supports regular maintenance, including watering, fertilization, and pest control. We monitor the plant’s health and make adjustments as needed to promote robust growth.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Growth Monitoring</h3>
              <p>We track the growth and development of each plant, ensuring it receives the care it needs to mature. Your contribution helps fund this ongoing monitoring and adjustment.</p>
            </div>
            <div className="bg-white bg-opacity-25 backdrop-blur-lg border border-white border-opacity-20 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Impact Reporting</h3>
              <p>You’ll receive updates on your plant’s progress, including photos and details about its development. This transparency shows how your donation is making a difference.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg sm:text-xl mb-6">Want to see your impact firsthand? Contribute today and be part of our journey in nurturing the environment.</p>
            {/* <a href="/donate" className="inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-full transition-colors duration-300 hover:bg-green-800">Donate Now</a> */}
            <a href="/donate" className="button button-green">Donate Now</a>

          </div>
        </div>
      </section>







      {/* our mission */}



      <section className="py-20 bg-gray-200">
        <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            We strive to combat climate change and promote environmental sustainability by planting trees and restoring natural habitats. Our mission is to create a greener, healthier planet for future generations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-4">
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

            <div className="p-4">
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
      <section className="py-16 bg-gray-300 text-[#333] bg-cover bg-bottom">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-6 text-center">
            Sponsors
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
            We are grateful for the support of our sponsors, who help us make a positive impact on the environment. Their contributions enable us to continue our mission of planting trees and promoting sustainability.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            {sponsors.map((sponsor: any) => (
              <div
                key={sponsor._id}
                className="relative group bg-white border-t-2 border-green-600 h-[120px] w-[220px] flex items-center justify-center rounded-lg shadow-lg overflow-hidden p-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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
            ))}
          </div>
        </div>
      </section>





      {/* our impact */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-6">Our Impact</h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Together, we have made significant strides in fostering a greener planet. Here’s a look at the positive impact we’ve created.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { value: '10K+', label: 'Trees Planted' },
              { value: '500+', label: 'Volunteers' },
              { value: '50+', label: 'Communities Reached' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white p-8 border-t-4 border-green-600 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
                <h3 className="text-5xl font-extrabold text-green-800 mb-4">{value}</h3>
                <p className="text-xl text-gray-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* testimonials */}







      <section className="py-16 bg-gray-300">
        <div className="container mx-auto text-center">
          {/* <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-12 shadow-md">
      What People Are Saying
    </h2> */}
          <h2 className="text-4xl font-bold text-green-900 mb-6">What People Are Saying</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
          Voices from our green warriors
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
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
            ].map(({ name, quote, image }) => (
              <div
                key={name}
                className="bg-white p-6 rounded-lg border-t-4 border-green-600 shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={image}
                  alt={name}
                  className="rounded-full w-16 h-16 mb-4 mx-auto border-2 border-green-600"
                />
                <p className="text-gray-700 italic mb-4">"{quote}"</p>
                <h3 className="text-xl font-semibold text-green-800">{name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* contact us */}
      {/* <section className="py-16 bg-[#9cc09c]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-green-900 mb-8">Contact Us</h2>
            <form className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto md:mx-0">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea id="message" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"></textarea>
              </div>
              <button type="submit" className="bg-green-700 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img src="contact-us.png" alt="Contact Us" className="w-3/4 md:w-full max-w-xs md:max-w-md" />
          </div>
        </div>
      </section> */}

      <Footer />

    </>
  );
}

export default Page;
