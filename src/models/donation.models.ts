
import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { string } from 'zod';

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

    plantationImage?: string;
    plantationStatus?: string;
    certificate?: string;
    isPasswordCorrect(password: string): Promise<boolean>;

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

    
    plantationImage:{
        type:String
    },
    plantationStatus:{
        type:String
    },

    certificate:{
        type:String
    },
    platform:{
        type:String,
        default:"foundation"
    }
},{timestamps:true});

DonationSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error('Error while ========== comparing passwords:', error);
        throw new Error('Error while comparing passwords')
    }
}




const DonationModel = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
export default DonationModel;
