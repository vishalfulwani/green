
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    userName: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    refreshToken?: string;
    role: string;
    platform: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
    };
    phone:string;
    cart: mongoose.Types.ObjectId[];
    buy: mongoose.Types.ObjectId[];
    isPasswordCorrect(password: string): Promise<boolean>;
}

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
    platform: {
        type: String,
        default: "ecommerce"
    },
    address: {
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        postalCode: { type: String, default: '' },
    },
    phone:{type:String,default:''},

}, { timestamps: true });

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error while comparing passwords:', error);
        throw new Error('Error while comparing passwords');
    }
};

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
