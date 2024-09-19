
import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  _id:mongoose.Types.ObjectId
  code: string;
  discountPercentage: string;
  isActive: boolean;
  expirationDate: Date;
  limit: string;
  appliedBy: [mongoose.Types.ObjectId];
  createdAt:Date
}

const CouponSchema: Schema = new Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  discountPercentage: { 
    type: String, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  expirationDate: { 
    type: Date, 
    required: true 
   },
   limit:{
    type:String,
default:"0"
   },
   appliedBy:{
    type:[mongoose.Types.ObjectId],
    ref:"User",
   }

},{timestamps:true});

const CouponModel =  mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export default CouponModel
