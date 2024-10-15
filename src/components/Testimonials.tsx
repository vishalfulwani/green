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
                        className="w-full "
                    >
                        <CarouselContent >
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-white border-t-4 border-green-600 p-4 md:p-6 rounded-lg shadow-lg">
                                    <p className="text-base md:text-lg italic">
                                        "GreenLife has transformed my home into a green paradise. The quality of their plants is truly unmatched."
                                    </p>
                                    <h4 className="mt-4 font-semibold">- Jane Doe</h4>
                                </div>
                            </CarouselItem>

                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">

                                <div className="bg-white border-t-4 border-green-600 p-4 md:p-6 rounded-lg shadow-lg">
                                    <p className="text-base md:text-lg italic">
                                        "Their selection of rare and unique plants is unmatched. I’m thrilled with my new additions to my garden."
                                    </p>
                                    <h4 className="mt-4 font-semibold">- Laura Martinez</h4>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-white border-t-4 border-green-600 p-4 md:p-6 rounded-lg shadow-lg">
                                    <p className="text-base md:text-lg italic">
                                        "I've ordered several times, and each time the plants have exceeded my expectations. Highly recommended!"
                                    </p>
                                    <h4 className="mt-4 font-semibold">- Daniel Wilson</h4>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-white border-t-4 border-green-600 p-4 md:p-6 rounded-lg shadow-lg">
                                    <p className="text-base md:text-lg italic">
                                        "The online shopping experience was seamless, and the plant care tips provided were incredibly helpful."
                                    </p>
                                    <h4 className="mt-4 font-semibold">- Olivia Johnson</h4>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-white border-t-4 border-green-600 p-4 md:p-6 rounded-lg shadow-lg">
                                    <p className="text-base md:text-lg italic">
                                        "They offers a fantastic selection of plants and gardening tools. Their customer service is top-notch!"
                                    </p>
                                    <h4 className="mt-4 font-semibold">- Emily Davis</h4>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        {/* <CarouselPrevious /> */}
                        {/* <CarouselNext /> */}
                    </Carousel>
                </div>
            </div>
        </section>

    )

}

export default Testimonials