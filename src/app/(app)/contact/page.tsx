'use client'

import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useState } from 'react';
import { CgPhone } from 'react-icons/cg';
import { FaAddressCard } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      // Sending form data to the API
      const response = await axios.post('/api/send-email', {
        name:formData.name,
        email:formData.email,
        subject:formData.subject,
        message:formData.message,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(formData.name,"formData")
      console.log(response,"=======")
  
      // Assuming the response is successful
      if (response.status >= 200 && response.status < 300) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
  
        toast({
          title: 'Success',
          description: 'Message Sent Successfully!',
          className: 'toast-success',
        });
      } else {
        setStatus('Failed to send the message. Please try again.');
        toast({
          title: 'Failed',
          description: 'Failed to send the message. Please try again.',
          className: 'toast-error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('An error occurred. Please try again later.');
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        className: 'toast-error',
      });
    }
  };
  


  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header Section */}
      <div className="text-center py-12 bg-gray-200">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-sm text-gray-600 mt-2">Home / Contact Us</p>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center">

      <div className="relative w-full  bg-black bg-opacity-30">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345095473!2d-122.40137748468118!3d37.79239297975548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c04000001%3A0x7b97f4e9cd8565d8!2sGoogleplex!5e0!3m2!1sen!2sus!4v1633878740781!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 ,  }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>


      <div className='bg-white'>
          <h2 className="text-2xl font-bold mb-4 bg-gray-200  p-4">Tell Us Your Project</h2>
          <form className="space-y-6 p-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter Name'
                className="mt-2 block w-full py-2 text-green-800 placeholder:text-gray-500 px-3  shadow-sm focus:border-green-500 focus:ring-green-500 border-2 border-gray-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter Email'
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full py-2 text-green-800 placeholder:text-gray-500 px-3   shadow-sm focus:border-green-500 focus:ring-green-500 border-2 border-gray-200"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder='Enter Subject'
                className="mt-2 block w-full py-2 text-green-800 placeholder:text-gray-500 px-3   shadow-sm focus:border-green-500 focus:ring-green-500 border-2 border-gray-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-2 block w-full py-2 text-green-800 placeholder:text-gray-500 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 border-2 border-gray-200"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div className='flex justify-end'> 

            <button
              type="submit"
              className="w-auto px-10 py-2 text-white bg-green-700 rounded-md hover:bg-green-800"
              >
              Submit
            </button>
                </div>
          </form>
        </div>

      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center">
        {/* Contact Information */}
        <div className='h-100 flex flex-col justify-center '>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            sapiente harum numquam, mollitia aut adipisci incidunt. Natus et
            velit at.
          </p>
          <ul className="space-y-4">
            <div className="bg-white w-full h-[2px] " ></div>
        <li className="flex items-center">
          <span className="text-xl text-green-800 mr-3"><FaAddressCard /></span>
          <span className="text-gray-700 font-medium">Address:</span>
          <span className="ml-2 text-gray-700">123 5th Avenue, New York City</span>
        </li>
        <div className="bg-white w-full h-[2px] " ></div>

        <li className="flex items-center">
          <span className="text-xl text-green-800 mr-3"><MdEmail /></span>
          <span className="text-gray-700 font-medium">Email:</span>
          <span className="ml-2 text-gray-700">example@gmail.com</span>
        </li>
        <div className="bg-white w-full h-[2px] " ></div>

        <li className="flex items-center">
          <span className="text-xl text-green-800 mr-3"><CgPhone /></span>
          <span className="text-gray-700 font-medium">Phone:</span>
          <span className="ml-2 text-gray-700">212-456-7890</span>
        </li>
        <div className="bg-white w-full h-[2px] " ></div>

      </ul>
        </div>

        {/* Contact Form */}

        <div >
            <img src="/contact-us.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
