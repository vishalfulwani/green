// components/CustomSlider.tsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />, // Custom previous arrow
    nextArrow: <CustomNextArrow />, // Custom next arrow
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...sliderSettings}>
        {/* Slide 1 */}
        <Slide
          heading="BIG SALE"
          subText="Discount 20% Off For Lukani Members"
          buttonText="Discover Now"
          buttonLink="/shop/plants"
          bgImage="https://min-plant-store-demo.myshopify.com/cdn/shop/files/slideshow-v1-1.jpg?v=1613697882"
        />

        {/* Slide 2 */}
        <Slide
          heading="EXCLUSIVE OFFER"
          subText="Save 30% Today on Selected Items"
          buttonText="Shop Now"
          buttonLink="/shop/seeds"
          bgImage="https://min-plant-store-demo.myshopify.com/cdn/shop/files/slideshow-v1-2.jpg?v=1613697882"
        />
      </Slider>
    </div>
  );
};

// Custom Previous Arrow
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 h-8 flex items-center justify-center content-center w-8 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-green-600 text-white rounded-full p-3 hover:bg-green-700"
    onClick={onClick}
  >
    &#8249;
  </div>
);

// Custom Next Arrow
const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-4  h-8 flex justify-center items-center content-center w-8 transform -translate-y-1/2 z-10 cursor-pointer bg-green-600 text-white rounded-full p-3 hover:bg-green-700"
    onClick={onClick}
  >
    &#8250;
  </div>
);

const Slide = ({
  heading,
  subText,
  buttonText,
  buttonLink,
  bgImage,
}: {
  heading: string;
  subText: string;
  buttonText: string;
  buttonLink: string;
  bgImage: string;
}) => (
  <div
    className="w-full xl:max-h-[600px] lg:max-h-[500px] max-h-[500px] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-start px-8 py-12"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    {/* Content Container */}
    <div className="bg-white/70 p-8 lg:ml-28 sm:ml-12 rounded-lg max-w-xl text-center md:text-left md:bg-transparent md:p-0">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
        {heading.split(" ")[0]}{" "}
        <span className="text-green-500">{heading.split(" ")[1]}</span>
      </h2>
      {/* Subtext */}
      <p className="mt-4 text-lg mb-2 text-green-700">
        {subText.split(" ").map((word, index) =>
          word.includes("%") || word.includes("Off") ? (
            <span key={index} className="text-green-600 font-bold">
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </p>
      {/* Button */}
      <a href={buttonLink}>
        <button className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-700 transition duration-300">
          {buttonText}
        </button>
      </a>
    </div>
  </div>
);

export default CustomSlider;
