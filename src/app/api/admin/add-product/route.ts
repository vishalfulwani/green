// pages/api/products.ts
import dbConnect from '@/dbconfig/dbConnect';
import ProductModel from '@/models/product.models';
import uploadOnCloudinary from '@/lib/cloudinary';
import { ApiResponse } from '@/helpers/ApiResponse';



export async function POST(req: Request) {
    

    const getRandomRating = () => {
        const ratings = [4.7, 4.8, 4.9, 5.0, 4.6, 4.5, 4.4];
        return ratings[Math.floor(Math.random() * ratings.length)];
    };
    

    await dbConnect();

    const formData = await req.formData();
    const productName = formData.get('productName') as string
    const productDesc = formData.get('productDesc') as string
    const category = formData.get('category') as string
    const subCategory = formData.get('subCategory') as string
    const images = formData.getAll('images') as File[];
    const price = formData.get('price') as string
    const sellingPrice = formData.get('sellingPrice') as string


    console.log(productDesc, productName, price)
    console.log("*******************************",images)
    if (!(productName || productDesc || price)) {
        return Response.json(
            new ApiResponse(false, 400, {}, "all fields are required"),
            { status: 400 }
        )
    }

    try {

        // Upload images to Cloudinary
        console.log("[]{}[]")
        const uploadPromises = images.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            return uploadOnCloudinary(buffer, file.name);
        });

        console.log("000000000")
        const uploadResults = await Promise.all(uploadPromises);
        console.log("000000000")
        const imageUrls = uploadResults.map((result: any) => result.secure_url);
        console.log("0000000003333")


        if (!imageUrls) {
            return Response.json(
                new ApiResponse(false, 200, {}, "Images failed to upload"),
                { status: 200 }
            )
        }
        console.log("+++",imageUrls)
        const newProduct = new ProductModel({
            productName,
            productDesc,
            category,
            subCategory,
            images: imageUrls.map((result) => result),
            price,
            sellingPrice,
            rating:getRandomRating()
        });
        
        await newProduct.save();
        console.log("...",newProduct.images)

        return Response.json(
            new ApiResponse(true, 200, {}, "Product added successfully "),
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while adding product"),
            { status: 500 }
        );
    }
};

