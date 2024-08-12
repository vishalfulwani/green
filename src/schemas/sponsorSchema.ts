// import { z } from "zod";
// import mongoose from "mongoose";

// export const sponsorSchema = z.object({
//   _id: z.instanceof(mongoose.Types.ObjectId).optional(),  // _id is usually optional for creation
//   name: z.string().min(1, "Name is required"),
//   image: z.instanceof(File), 
//   link: z.string().url("Invalid URL"),
// });


import { z } from "zod";
import mongoose from "mongoose";

// Custom schema for the image field
const imageSchema = typeof window !== "undefined"
  ? z.instanceof(File) // For client-side validation
  : z.any(); // Server-side: Skip the File validation

export const sponsorSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId).optional(),  // _id is optional for creation
  name: z.string().min(1, "Name is required"),
  image: imageSchema,
  link: z.string().url("Invalid URL"),
});
