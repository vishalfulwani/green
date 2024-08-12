import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/dbconfig/dbConnect';
import { ApiResponse } from '@/helpers/ApiResponse';
import ProductModel from '@/models/product.models';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  await dbConnect();

    try {
      const products = await ProductModel.find({});
      return Response.json(
        new ApiResponse(true,200,products,"Products  data fetched"),
        {status:200}
      )

      }
     catch (error) {
      Response.json(
        new ApiResponse(false,500,{},"error while fetching products  data"),
        {status:500}
      )
    }

}
