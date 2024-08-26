'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const categories = [
    { value: 'plants', label: 'Plants' },
    { value: 'tools', label: 'Tools' },
    { value: 'seeds', label: 'Seeds' },
];

const subCategories: Record<string, { value: string; label: string }[]> = {
    plants: [
        { value: 'indoor-plants', label: 'Indoor Plants' },
        { value: 'outdoor-plants', label: 'Outdoor Plants' },
        { value: 'herbs', label: 'Herbs' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'succulents', label: 'Succulents' },
        { value: 'aquatic-plants', label: 'Aquatic Plants' },
        { value: 'medicinal-plants', label: 'Medicinal Plants' },
        { value: 'tropical-plants', label: 'Tropical Plants' },
    ],
    tools: [
        { value: 'hand-tools', label: 'Hand Tools' },
        { value: 'power-tools', label: 'Power Tools' },
        { value: 'watering-tools', label: 'Watering Tools' },
        { value: 'planting-tools', label: 'Planting Tools' },
        { value: 'garden-maintenance', label: 'Garden Maintenance' },
    ],
    seeds: [
        { value: 'vegetable-seeds', label: 'Vegetable Seeds' },
        { value: 'flower-seeds', label: 'Flower Seeds' },
        { value: 'herb-seeds', label: 'Herb Seeds' },
        { value: 'fruit-seeds', label: 'Fruit Seeds' },
        { value: 'grass-seeds', label: 'Grass Seeds' },
    ],
};

const EcommerceNavbar = () => {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const router = useRouter();

    const handleClick = (href:any) => {
        router.push(href);
    };

    return (
        <nav className="bg-green-800 text-white py-1 fixed w-full top-0 left-0 shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-2xl font-bold">Plant E-commerce</div>
                <ul className="flex space-x-8">
                    {categories.map((category) => (
                        <li
                            key={category.value}
                            className="relative group"
                            onMouseEnter={() => setActiveCategory(category.value)}
                            onMouseLeave={() => setActiveCategory(null)}
                            onClick={()=>handleClick(`/shop/${category.value}`)}
                        >
                            <div className="flex items-center cursor-pointer">
                                {category.label}
                                <svg
                                    className="ml-2 w-4 h-4 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {activeCategory === category.value && (
                                <ul className="absolute left-0 w-[180px] mt-2 bg-white text-black rounded shadow-lg transition-all duration-300 ease-in-out transform scale-y-0 group-hover:scale-y-100 origin-top">
                                    {subCategories[category.value].map((subCategory) => (
                                        <li
                                            key={subCategory.value}
                                            className="px-4 py-2 hover:bg-green-100 transition-colors duration-200"
                                        >
                                            {subCategory.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <Link href="/signup" className="px-5 py-2 bg-white text-green-800 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300">
                    Sign Up
                </Link>
            </div>
        </nav>
    );
}

export default EcommerceNavbar