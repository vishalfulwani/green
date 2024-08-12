import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import UserModel from '@/models/user.models';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  await dbConnect();

    try {
      const users = await UserModel.find({});
      return Response.json(
        new ApiResponse(true,200,users,"Users  data fetched"),
        {status:200}
      )

      }
     catch (error) {
      Response.json(
        new ApiResponse(false,500,{},"error while fetching users data"),
        {status:500}
      )
    }

}
