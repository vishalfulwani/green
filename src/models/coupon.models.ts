
import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  _id:mongoose.Types.ObjectId
  code: string;
  discountPercentage: string;
  isActive: boolean;
  expirationDate: Date;
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
   }
},{timestamps:true});

const CouponModel =  mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export default CouponModel
