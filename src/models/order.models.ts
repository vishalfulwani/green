import mongoose, { Document, Schema } from 'mongoose';
import { string } from 'zod';

export interface IOrderItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  // price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  currency: string;
  totalAmount: number;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  items: IOrderItem[];
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phone:string;
  couponCode: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  // price: { 
  //   type: Number, 
  //   required: true 
  // },
}, { id: false });

const OrderSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  items: [OrderItemSchema],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  phone:{type:String,required:true},
  couponCode: { type: String, default: "" },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;