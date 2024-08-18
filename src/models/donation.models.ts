
import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
    amount: number;
    currency: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    donorName: string;
    donorEmail: string;
    donorContact: string;
    status: 'created' | 'paid' | 'failed';
    createdAt: Date;
}

const DonationSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    donorContact: { type: String, required: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    createdAt: { type: Date, default: Date.now },
});

// const Donation = mongoose.model<IDonation>('Donation', DonationSchema);
const Donation = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
export default Donation;
