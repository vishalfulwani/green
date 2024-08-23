import mongoose , {Document,Schema} from 'mongoose'


export interface IProduct extends Document{
    _id:mongoose.Types.ObjectId;
    productName:string;
    productDesc:string;
    price:string;
    images:string[];
    sellingPrice:string;
    category:string;
    subCategory:string;
    rating:string;
}



const productSchema:Schema<IProduct> = new Schema({
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
    images:{
        type:[String],
        required:true,
    },
    sellingPrice:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true
    }
},{timestamps:true})




const ProductModel = (mongoose.models.Product as mongoose.Model<IProduct>)   ||  mongoose.model<IProduct>("Product",productSchema)
export default ProductModel