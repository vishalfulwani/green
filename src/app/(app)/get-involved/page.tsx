'use client'

import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import { useEffect, useState } from "react"



const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                console.log("*************",allProducts)
                const productData = allProducts.data.data as []
                console.log(productData,"*************")
                setProducts(productData)
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
            <section className="relative mt-16 bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://tse4.mm.bing.net/th?id=OIP.PmYLz8bYGfvP-yEOjJW-6AHaCl&pid=Api&P=0&h=180)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col items-center text-center text-white">
                    <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Green Foundation</h1>
                    <p className="text-xl mb-8">Discover our amazing variety of plants and bring nature to your home.</p>

                    {isSubmitting ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="flex flex-wrap justify-center mt-12">
                            {products.map((product, index) => (
                               <div
                               key={product._id.toString()}
                               className="w-1/3 p-4"
                               onMouseEnter={() => setHoveredProductId(product._id.toString())}
                               onMouseLeave={() => setHoveredProductId(null)}
                           >
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                                        <img
                                            src={product.images[0]}
                                            alt={product.productName}
                                            className={`w-full h-48 object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                        />
                                        <img
                                            src={product.images[1]}
                                            alt={product.productName}
                                            className={`w-full h-48 object-cover transition-opacity duration-500 absolute inset-0 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                            <p className="text-green-500 font-bold">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Page
