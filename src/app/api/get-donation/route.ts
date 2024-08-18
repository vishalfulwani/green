import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import DonationModel from '@/models/donation.models';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  await dbConnect();

    try {
      const donations = await DonationModel.find({});
      return Response.json(
        new ApiResponse(true,200,donations,"Donations  data fetched"),
        {status:200}
      )

      }
     catch (error) {
      Response.json(
        new ApiResponse(false,500,{},"error while fetching donations  data"),
        {status:500}
      )
    }

}
