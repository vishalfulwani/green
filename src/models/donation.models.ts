
import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
    _id:mongoose.Types.ObjectId
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    donorName: string;
    donorEmail: string;
    donorEmailPassword: string;
    donorContact: string;
    status: 'created' | 'paid' | 'failed';
    createdAt: Date;
}

const DonationSchema: Schema = new Schema({
    amount: {
        type: Number, 
        required: true 
    },
    currency: { 
        type: String, 
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
    donorName: { 
        type: String, 
        required: true 
    },
    donorEmail: { 
        type: String, 
        required: true 
    },
    donorEmailPassword:{
        type:String,
        required:true
    },
    donorContact: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['created', 'paid', 'failed'], 
        default: 'created' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
},{timestamps:true});

const DonationModel = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
export default DonationModel;
