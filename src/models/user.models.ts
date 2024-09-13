import mongoose, { Schema, SchemaType } from 'mongoose'
import bcrypt from 'bcrypt';
import { IProduct } from './product.models';




// interface ICartItem {
//     // productId: Schema.Types.ObjectId;
//     product: IProduct;
//     quantity: number;
//   }

export interface IUser extends Document {
    _id:mongoose.Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    refreshToken?: string;
    role: string;
    userType:string;
    platform:string;
    cart:Schema.Types.ObjectId[];
    buy: Schema.Types.ObjectId[]
    isPasswordCorrect(password: string): Promise<boolean>;
}


// const cartItemSchema: Schema<ICartItem> = new Schema({
//     product: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'ProductModel', 
//         required: true 
//     },
//     // quantity: { 
//     //     type: Number, 
//     //     default: 1 
//     // },
//   });


const userSchema: Schema<IUser> = new Schema({
    userName: {
        type: String,
        required: [true, "userName is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    cart: [
        // cartItemSchema
        {
            type: Schema.Types.ObjectId,
            ref: "ProductModel",
        }
    ],
    buy: [
        {
            type: Schema.Types.ObjectId,
            ref: "ProductModel"
        }
    ],
    userType:{
        type:String,
    },
    platform:{
        type:String,
        default:"ecommerce"
    }

}, { timestamps: true })


userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error while ========== comparing passwords:', error);
        throw new Error('Error while comparing passwords')
    }
}







const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", userSchema)
export default UserModel