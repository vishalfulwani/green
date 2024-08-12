import { z } from "zod";
import mongoose from "mongoose";

export const productSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),  // _id is usually optional for creation
  productName: z.string().min(1, "Product name is required"),
  price: z.string(),
  images: z.array(z.instanceof(File)),
  productDesc: z.string().optional(),
  category: z.string().optional(),
});


