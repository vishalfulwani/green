import mongoose , {Schema} from 'mongoose'
import bcrypt from 'bcrypt'


export interface IProduct extends Document{
    productName:string;
    productDesc:string;
    price:string;
    productImage1:string;
    productImage2:string;
    productImage3:string;
    productImage4:string;
}

const productSchema = new Schema({
    productName:{
        type:String,
        required:true,
    },
    productDesc:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    productImage1:{
        type:String,
        required:true,
    },
    productImage2:{
        type:String,
        required:true,
    },
    productImage3:{
        type:String,
        required:true,
    },
    productImage4:{
        type:String,
        required:true,
    }
},{timestamps:true})




const ProductModel = (mongoose.models.Product as mongoose.Model<IProduct>)   ||  mongoose.model<IProduct>("Product",productSchema)
export default ProductModel