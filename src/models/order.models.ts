import mongoose, { Document, Schema } from 'mongoose';

interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
});

const OrderSchema: Schema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [OrderItemSchema],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
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

const OrderModel = mongoose.models.Donation || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;