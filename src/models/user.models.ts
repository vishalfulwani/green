import mongoose , {Schema} from 'mongoose'
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    userName:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    refreshToken?:string;
    role:string;
    isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema:Schema<IUser> = new Schema({
    userName:{
        type:String,
        required:[true,"userName is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verify Code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify Code Expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true})


userSchema.methods.isPasswordCorrect = async function (password:string):Promise<boolean>{
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        throw new Error('Error while comparing passwords')
    }
}







const UserModel = (mongoose.models.User as mongoose.Model<IUser>)   ||  mongoose.model<IUser>("User",userSchema)
export default UserModel