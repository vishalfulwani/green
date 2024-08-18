import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/dbconfig/dbConnect';
import SponserModel from '@/models/sponsor.models';
import { ApiResponse } from '@/helpers/ApiResponse';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  await dbConnect();

    try {
      const sponsors = await SponserModel.find({});
      return Response.json(
        new ApiResponse(true,200,sponsors,"Sponsers data fetched"),
        {status:200}
      )

      }
     catch (error) {
      Response.json(
        new ApiResponse(false,500,{},"error while fetching sponsors data"),
        {status:500}
      )
    }

}