import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="flex items-center space-x-4 text-sm text-gray-600 py-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <a
            href={item.href}
            className={`flex items-center font-medium transition-all duration-300 ease-in-out ${index === items.length - 1 ? 'text-green-800' : 'text-gray-600 hover:text-green-600'}`}
          >
            {item.label}
          </a>
          {index < items.length - 1 && (
            <IoIosArrowForward className="text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
