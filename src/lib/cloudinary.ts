import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { Readable } from 'stream';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const uploadOnCloudinary = async (localFilePath:any)=>{
//     try{
//         if (!localFilePath) return null
//         // upload file
//         const result = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:'auto'
//         })
//         // file uploaded successfully
//         // console.log("file is uploaded on cloudinary",result.url)
//         fs.unlinkSync(localFilePath)   // remove the locally saved temporary file as the upload completes
//         return result
//     }
//     catch(error){
//         fs.unlinkSync(localFilePath)   // remove the locally saved temporary file as the upload operation failed
//         return null
//     }
// }


const uploadOnCloudinary = async (buffer: Buffer, filename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', public_id: filename },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      const readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  };


export default uploadOnCloudinary