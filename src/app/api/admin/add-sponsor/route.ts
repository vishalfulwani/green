// pages/api/products.ts
import dbConnect from '@/dbconfig/dbConnect';
import ProductModel from '@/models/product.models';
import uploadOnCloudinary from '@/lib/cloudinary';
import { ApiResponse } from '@/helpers/ApiResponse';
import SponsorModel from '@/models/sponsor.models';



export async function POST(req: Request) {

    await dbConnect();

    const formData = await req.formData();
    const name = formData.get('name') as string
    const link = formData.get('link') as string
    const image = formData.get('image') as File;

   console.log
    if (!(name || link || image)) {
        return Response.json(
            new ApiResponse(false, 400, {}, "all fields are required"),
            { status: 400 }
        )
    }
    
    console.log('hello',name,link,image)
    try {


        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadOnCloudinary(buffer, image.name);

        
        if (!uploadResult || !uploadResult.secure_url) {
            return Response.json(
                new ApiResponse(false, 500, {}, "Image failed to upload"),
                { status: 500 }
            )
        }

        
        const newSponsor = new SponsorModel({
            name,
            link,
            image: uploadResult.secure_url
        });
        
        await newSponsor.save();

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

