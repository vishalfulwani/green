import dbConnect from "@/dbconfig/dbConnect";
import { ApiResponse } from "@/helpers/ApiResponse";
import uploadOnCloudinary from "@/lib/cloudinary";
import DonationModel, { IDonation } from "@/models/donation.models";

export async function GET(req: Request) {
    await dbConnect();

    const formData = await req.formData();
    const id = formData.get('id') as string;
    const certificate = formData.get('certificate') as File

    console.log('***')
    if (!(id || certificate )) {
        return Response.json(
            new ApiResponse(false, 400, {}, 'Please fill in all fields'),
            { status: 400 }
        )
    }

    try {
        const arrayBuffer = await certificate.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadOnCloudinary(buffer, certificate.name);

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

        user.certificate = uploadResult.secure_url

        await user.save()

        return Response.json(
            new ApiResponse(true, 200, user, "Certificate added successfully"),
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            new ApiResponse(false, 500, {}, "Error while adding certificate"),
            { status: 500 }
        )
    }

}
