'use client'

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const Testimonials = () => {
    const autoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (


        <section className="py-12 md:py-16  bg-gray-100">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold ">What Our Customers Say</h2>
                <p className="text-center text-base md:text-lg lg:text-xl mt-4 mb-8 md:mb-12">
                    Hear what our happy customers have to say about us!
                </p>

                <div className="w-full flex justify-center items-center ">


                    <Carousel
                        plugins={[autoplay.current]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {[
                                {
                                    name: 'John Doe',
                                    quote: '  "Their selection of rare and unique plants is unmatched. I’m thrilled with my new additions to my garden."',
                                    image: 'https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6833.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                                },
                                {
                                    name: 'Jane Smith',
                                    quote: 'GreenLife has transformed my home into a green paradise. The quality of their plants is truly unmatched.',
                                    image: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671134.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                                },
                                {
                                    name: 'Samantha Brown',
                                    quote: "I've ordered several times, and each time the plants have exceeded my expectations. Highly recommended!",
                                    image: 'https://tse3.mm.bing.net/th?id=OIP.U64OwTZionM0NSNtjIGUqQHaHa&pid=Api&P=0&h=180',
                                },
                                {
                                    name: 'David Wilson',
                                    quote: 'The online shopping experience was seamless, and the plant care tips provided were incredibly helpful.',
                                    image: 'https://img.freepik.com/free-photo/3d-rendering-smiling-man-avatar_23-2149436191.jpg?size=626&ext=jpg&ga=GA1.1.716411687.1716966942&semt=ais_hybrid',
                                },

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
            </div>
        </section>

    )

}

export default Testimonials