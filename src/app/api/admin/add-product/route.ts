// pages/api/products.ts
import dbConnect from '@/dbconfig/dbConnect';
import ProductModel from '@/models/product.models';
import uploadOnCloudinary from '@/lib/cloudinary';
import { ApiResponse } from '@/helpers/ApiResponse';



export async function POST(req: Request) {
    
    await dbConnect();

    const formData = await req.formData();
    const productName = formData.get('productName') as string
    const productDesc = formData.get('productDesc') as string
    const price = formData.get('price') as string
    const images = formData.getAll('images') as File[];


    console.log(productDesc, productName, price)
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

        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map((result: any) => result.secure_url);

        if (!imageUrls) {
            return Response.json(
                new ApiResponse(false, 200, {}, "Images failed to upload"),
                { status: 200 }
            )
        }

        const newProduct = new ProductModel({
            productName,
            productDesc,
            price,
            images: imageUrls.map((result) => result)
        });

        await newProduct.save();

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

