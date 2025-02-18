import Testimonials from '@/components/Testimonials';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className=" pt-16 min-h-screen ">
      <header className="text-center py-10 bg-gray-100">
        <h1 className=" text-2xl lg:text-3xl font-bold">About Us</h1>
        <p className="text-gray-500 mt-2">Home / About Us</p>
      </header>

      <section className="text-center mb-10">
        <div className=" w-full  h-[300px] bg-no-repeat bg-center bg-cover"
        style={{"backgroundImage":"url(https://htmldemo.net/lukani/lukani/assets/img/about/about1.jpg)"}}>
     {/* <img src="https://htmldemo.net/lukani/lukani/assets/img/about/about1.jpg" alt=""  className='w-full '/> */}
        </div>
      </section>

      <section className="text-center px-6 py-10">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          We Are A Digital Agency Focused On Delivering Content And Utility User-Experiences.
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-sm lg:text-base">
          Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-6 px-6 pt-10 pb-10">
        <div className="flex-1 min-w-[250px] max-w-sm p-6 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Creative Design</h3>
          <p className="text-gray-600 text-sm lg:text-base">Build modern and unique digital experiences, product and brand designs that users will love!</p>
        </div>
        <div className="flex-1 min-w-[250px] max-w-sm p-6 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">100% Money Back Guarantee</h3>
          <p className="text-gray-600 text-sm lg:text-base">If you’re not satisfied with our services, we offer a hassle-free money-back guarantee.</p>
        </div>
        <div className="flex-1 min-w-[250px] max-w-sm p-6 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Online Support 24/7</h3>
          <p className="text-gray-600 text-sm lg:text-base">We provide round-the-clock support to ensure your satisfaction and success.</p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center gap-6 px-6 pb-20">
        <div className="flex-1 min-w-[300px] max-w-sm p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">What Do We Do?</h3>
          <p className="text-gray-600 text-sm lg:text-base">We create modern, innovative designs, provide reliable technical solutions, and offer a personalized approach to every project.</p>
        </div>
        <div className="flex-1 min-w-[300px] max-w-sm p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm lg:text-base">Our mission is to deliver high-quality, user-focused services to help our clients succeed in their endeavors.</p>
        </div>
        <div className="flex-1 min-w-[300px] max-w-sm p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">History Of Us</h3>
          <p className="text-gray-600 text-sm lg:text-base">Established in 2010, we have been at the forefront of innovation and design for over a decade.</p>
        </div>
      </section>

      <Testimonials/>
    </div>
  );
}
