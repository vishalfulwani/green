import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import uploadOnCloudinary from "@/lib/cloudinary";
import DonationModel, { IDonation } from "@/models/donation.models";

export async function GET(req: Request) {
    await dbConnect();

    const formData = await req.formData();
    const id = formData.get('id') as string;
    const image = formData.get('plantationImage') as File
    // const certificate = formData.get('certificate') as string
    const plantationStatus = formData.get('plantationStatus') as string

    console.log('***')
    if (!(id || image || plantationStatus)) {
        return Response.json(
            new ApiResponse(false, 400, {}, 'Please fill in all fields'),
            { status: 400 }
        )
    }

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

        const user = await DonationModel.findById(id) as IDonation;

        if (!user) {
            return Response.json(
                new ApiResponse(false, 404, {}, "User not found"),
                { status: 404 }
            )
        }

        user.plantationImage = uploadResult.secure_url
        user.plantationStatus = plantationStatus

        await user.save()

        return Response.json(
            new ApiResponse(true, 200, user, "Plantation data updated successfully"),
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while adding plantation data"),
            { status: 500 }
        )
    }

}
