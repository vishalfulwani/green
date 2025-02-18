import React, { useEffect, useState } from "react";

const ScrollingText = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`overflow-hidden bg-green-700 py-2 text-white transition-all duration-500 ease-in-out 
      `}
    >
      <div className="scrolling-text whitespace-nowrap">
        <span className="text-md font-medium">Holiday Sale - 50% off</span>
        <span className="mx-10">•</span>
        <span className="text-md font-medium">Holiday Sale - 50% off</span>
        <span className="mx-10">•</span>
        <span className="text-md font-medium">Holiday Sale - 50% off</span>
      </div>
    </div>
  );
};

export default ScrollingText;
