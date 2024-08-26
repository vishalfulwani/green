'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { IProduct } from '@/models/product.models';
import { useToast } from '@/components/ui/use-toast';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart, ICartItem } from '@/cartRedux/cartSlice';
import { ApiResponse } from '@/helpers/ApiResponse';
import Rating from '@/components/Rating';
import getRandomElements from '@/helpers/getRandomElements';
import Testimonials from '@/components/Testimonials';



const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [product, setProduct] = useState<IProduct[]>([])
    const [alsoLikeProducts, setAlsoLikeProducts] = useState<IProduct[]>([])
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

    const { id } = useParams();
    const { toast } = useToast()
    const router = useRouter()

    const dispatch = useDispatch();

    const handleAddToCart = (product: any) => {
        const cartItem: ICartItem = {
            product,
            quantity: 1,
        };
        dispatch(addToCart(cartItem));
        toast({
            title: "Success",
            description: "Product added to cart",
            className: "toast-success"
        })
        router.replace('/cart')
    };

    // fetching data
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


    useEffect(() => {
        const product = products.filter((product) => product._id.toString() === id)
        setProduct(product)

    }, [products])

    useEffect(() => {
        if (products.length > 0) {
            setAlsoLikeProducts(getRandomElements(products, 5));
        }
    }, [products]);

    return (


        <>

            <section className='min-h-screen mt-16 pt-10 bg-[#9cc09c]'>
                {product.length > 0 ? (
                    <div className="container mx-auto p-4 border-green-800 border-y-2 md:p-6 bg-cover bg-[#d8e6d8] rounded-lg shadow-lg " style={{ backgroundImage: "url(http://clipart-library.com/images/8izrdA9LT.png)", backgroundRepeat: "no-repeat", objectFit: 'cover', }}>

                        <div className="flex flex-col md:flex-row md:space-x-8">
                            <div className="relative w-full mb-4 md:w-1/2">
                                <div
                                    className="relative w-full mb-4 h-64 md:h-[400px] rounded-lg  border-green-800 border-y-2"
                                    onMouseEnter={() => setHoveredProductId(product[0]._id.toString())}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                >
                                    <img
                                        src={product[0].images[0]}
                                        alt={product[0].productName}
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${hoveredProductId === product[0]._id.toString() ? 'opacity-0' : 'opacity-100'}`}
                                    />
                                    {product[0].images.slice(1).map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={product[0].productName}
                                            className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-500 ${hoveredProductId === product[0]._id.toString() ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    ))}
                                </div>
                                <div className="flex gap-2 overflow-x-auto mb-6 ">
                                    {product[0].images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`${product[0].productName} image ${index + 1}`}
                                            className="h-[100px] object-cover  shadow-md transition-transform duration-500 hover:scale-105 rounded-lg  border-green-800 border-y-2"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 mt-6 md:mt-0">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 md:mb-8">{product[0].productName}</h1>
                                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">{product[0].productDesc}</p>
                                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">{product[0].category}</p>
                                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">{product[0].subCategory}</p>

                                <Rating rating={parseFloat(product[0].rating)} />

                                <div className="flex flex-col md:flex-row items-start md:items-center mb-6 space-y-2 md:space-x-4 md:space-y-0">
                                    <span className="text-2xl md:text-3xl font-bold text-green-600">${product[0].price}</span>
                                    <span className="text-base md:text-lg text-gray-500 line-through">${product[0].sellingPrice}</span>
                                </div>

                                <div className="space-y-4 flex-col md:w-1/2">
                                    <button className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300" onClick={() => handleAddToCart(product[0])}>
                                        Add to Cart
                                    </button>
                                    <button className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300" onClick={() => handleAddToCart(product[0])}>
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto p-4 md:p-6">
                        <p className="text-center text-lg md:text-xl text-gray-500">Loading...</p>
                    </div>
                )}
            </section>

            {/* plant care */}
            <section className=" bg-[#d8e6d8] py-16 px-4 md:px-8">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-2 ">Plant Care Guidelines</h2>
                    <p className="text-lg text-gray-700 text-center mb-12 md:max-w-2xl mx-auto ">
                        Follow these simple guidelines to ensure your plant thrives and stays healthy.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="https://tse3.mm.bing.net/th?id=OIP.EC8sy5v2RgdoAJdXeIeljQHaE8&pid=Api&P=0&h=180" alt="Sunlight" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Sunlight</h3>
                            <p className="text-gray-600 text-center">Ensure your plant receives adequate sunlight. Most plants require 6-8 hours of direct sunlight daily for optimal growth.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="https://tse4.mm.bing.net/th?id=OIP.6AA3Voe7l6O-NcGRa41ZfgHaE8&pid=Api&P=0&h=180" alt="Watering" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Watering</h3>
                            <p className="text-gray-600 text-center">Water your plant regularly, but avoid overwatering. Check the soil moisture before watering again.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="http://gardeningsoul.com/wp-content/uploads/2017/10/1-51.jpg" alt="Soil" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Soil</h3>
                            <p className="text-gray-600 text-center">Use well-draining soil to prevent root rot. Enrich the soil with organic matter for healthy growth.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="https://i2.wp.com/organiclivestockandcrops.org/wp-content/uploads/2017/10/synthetic-fertilizer-organic-livestock-and-crops-900x560.jpg" alt="Fertilization" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Fertilization</h3>
                            <p className="text-gray-600 text-center">Feed your plant with a balanced fertilizer during the growing season to encourage strong, healthy growth.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="https://www.bhg.com/thmb/Vyat6CSM248XjNZ62oV6EJgtrRw=/4000x0/filters:no_upscale():strip_icc()/BHG-Pruning-Roses-100398048-593d5673b2b14156b3eaddf1515c4beb.jpg" alt="Pruning" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Pruning</h3>
                            <p className="text-gray-600 text-center">Regularly prune your plant to remove dead or damaged leaves and promote new growth.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <img src="https://www.snexplores.org/wp-content/uploads/2022/08/1440_SS_humidity_feat-1380x776.jpg" alt="Humidity" className="w-20 h-20 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-green-600 mb-2 text-center">Humidity</h3>
                            <p className="text-gray-600 text-center">Maintain adequate humidity levels, especially for tropical plants. Mist your plants or use a humidifier if necessary.</p>
                        </div>
                    </div>
                </div>
            </section>



            {/* recommended */}
            <section className="py-16 px-4 md:px-8 bg-[#9cc09c]">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">Recommended</h2>
                    <p className="text-lg text-gray-700 text-center mb-8 md:max-w-2xl mx-auto">
                        Explore these recommended products that you'll love just as much!
                    </p>

                    <div className="flex flex-wrap justify-center gap-8">
                        {alsoLikeProducts.map((product) => (
                            <div
                                key={product._id.toString()}
                                className="w-full sm:w-1/2 lg:w-1/4 p-4"
                                onMouseEnter={() => setHoveredProductId(product._id.toString())}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg relative border-y-4 border-green-700">
                                    <div className="relative h-48">
                                        <img
                                            src={product.images[0]}
                                            alt={product.productName}
                                            className={`w-full h-full object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-0' : 'opacity-100'
                                                }`}
                                        />
                                        <img
                                            src={product.images[1]}
                                            alt={product.productName}
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredProductId === product._id.toString() ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                                        <Rating rating={parseFloat(product.rating)} />
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-3xl font-bold text-green-900">${product.price}</span>
                                            <span className="text-sm line-through text-gray-500">${product.sellingPrice}</span>
                                        </div>
                                        <button
                                            className="mt-4 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-green-600 text-white font-semibold text-sm rounded-md shadow-md hover:bg-green-700 transition duration-300"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />


        </>


    );
};

export default Page;
