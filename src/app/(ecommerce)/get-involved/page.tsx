'use client'

import { addToCart, ICartItem } from "@/cartRedux/cartSlice"
import Rating from "@/components/Rating"
import { useToast } from "@/components/ui/use-toast"
import { ApiResponse } from "@/helpers/ApiResponse"
import { IProduct } from "@/models/product.models"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';



const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

    const {toast} = useToast()
    const router = useRouter()

    const dispatch = useDispatch();

    const handleAddToCart = (product:any) => {
      const cartItem: ICartItem = {
        product,
        quantity: 1,
      };
      dispatch(addToCart(cartItem));
      toast({
                    title:"Success",
                    description:"Product added to cart",
                    className:"toast-success"
        })
        router.replace('/cart')
    };


    useEffect(() => {
        const fetchProducts = async () => {
            setIsSubmitting(true)
            try {
                const allProducts = await axios.get<ApiResponse>('/api/get-products')
                console.log("*************", allProducts)
                const productData = allProducts.data.data as []
                console.log(productData, "*************")
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
                                            <Rating rating={parseFloat(product.rating)} />
                                            <div className="flex justify-between items-center">
                                                <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                                <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                            </div>
                                            {/* <p className="text-green-500 font-bold">${product.price}</p> */}
                                            <button className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300" onClick={()=>handleAddToCart(product)}>
                                                Add to Cart
                                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1 5h12l-1-5M7 13h10M5 21h14a2 2 0 002-2H3a2 2 0 002 2z"></path></svg>
                                            </button>
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
