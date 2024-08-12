'use client'

import React, { useEffect, useState } from 'react';
import styles from '../style/home.module.css'; // Import if needed for other styles
import { ApiResponse } from '@/helpers/ApiResponse';
import axios from 'axios';

const Page = () => {

    // console.log("=========================")
    // const response = await axios.get<ApiResponse>('/api/get-sponsor',)
    // const sponsors = response.data.data as [];
    // // const allSponsers = sponsers.data 
    // console.log("**************",sponsors)


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

    {/* tree plantation section */}

      <section className="py-16 px-6 bg-[#d8e6d8] text-center mt-20">
        <div className="mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-semibold mb-2">Plant a Tree from the Comfort of Your Home</h2>
          <p className="text-lg mb-5">Make a difference without leaving your house and receive a personalized certificate.</p>

          <div className="flex flex-wrap justify-center items-center gap-10 text-black">
            <div className="w-80 h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-500 transition-transform duration-300 ease-in-out hover:scale-105 relative"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://treesunlimitednj.com/wp-content/uploads/Selecting-Trees-by-Shape.jpg" alt="Choose Tree" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-center">Choose Your Tree</h3>
              <p className="text-center px-4">Select the type of tree you wish to plant. Each tree offers unique benefits and characteristics, contributing to the environment and your personal green space.</p>
            </div>
            <div className="w-80 h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-500 transition-transform duration-300 ease-in-out hover:scale-105 relative"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://tse1.mm.bing.net/th?id=OIP.5nJzQeehuqQyzcbU15FviQHaEh&pid=Api&P=0&h=180" alt="Make a Donation" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-center">Make a Donation</h3>
              <p className="text-center px-4">Your donation covers the planting and ongoing care of the tree, helping it grow and thrive. This generous support ensures a lasting environmental impact.</p>
            </div>
            <div className="w-80 h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-500 transition-transform duration-300 ease-in-out hover:scale-105 relative"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://cdn.slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-3.jpg" alt="Receive Certificate" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-center">Get Your Certificate</h3>
              <p className="text-center px-4">After your tree is planted, you'll receive a personalized certificate with details about your tree's species, location, and its growth journey and impact.</p>
            </div>
            <div className="w-80 h-[400px] bg-white bg-cover bg-center rounded-lg shadow-lg border-t-4 border-green-500 transition-transform duration-300 ease-in-out hover:scale-105 relative"
              style={{ backgroundImage: `url('https://i.pinimg.com/originals/90/c7/7e/90c77eeada614b89fc96515573ccd84f.png')` }}>
              <img src="https://tse3.mm.bing.net/th?id=OIP.QbNt9-K1ZoegDjd5xrZP-wHaEk&pid=Api&P=0&h=180" alt="Track Your Tree" className="w-20 h-20 rounded-full mx-auto mt-6" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-center">Track Your Tree</h3>
              <p className="text-center px-4">Get regular updates on your tree's growth and impact. You'll receive photos and information about the tree's location and its contribution to the environment.</p>
            </div>
          </div>

          <div className="mt-16 flex justify-center  items-center gap-5">
            <a href="/plant-tree" className="button button-green">Plant a Tree Now</a>
            <a href="/learn-more" className="button button-outline">Learn More</a>
          </div>
        </div>
      </section>


    {/* Donation utilization section */}

      <section className="py-16 px-6 bg-[#f4f9f4] text-[#333] bg-cover bg-bottom" style={{ backgroundImage: `url('https://clipart-library.com/8300/1931/tree-branch-clipart-xl.png')` }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-2">How Your Donation Nurtures Growth</h2>
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
      </section>


    {/* sponsor section */}

    
    <section className="py-16 px-6 bg-lime-100 text-[#333] bg-cover bg-bottom" >
       <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-2">
            Sponsors
        </h2>
        <p className='text-lg mb-6'>
            We are grateful for the support of our sponsors, who help us make a positive impact on the
            environment. Their contributions enable us to continue our mission of planting trees and promoting
            sustainability.
        </p>
       <div className='flex flex-wrap items-center gap-5'>
        {
            sponsors.map((sponser:any)=>(
                <div className="h-[100px] w-[200px]" key={sponser._id}>
                    <img src={sponser.image} alt="" />
                    
                </div>
            ))
        }

        </div>
       </div>
    </section>


    </>
  );
}

export default Page;
