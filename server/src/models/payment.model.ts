import mongoose from 'mongoose';

import { UserDocument } from './user.model';



export interface PaymentInput{
    user: UserDocument['_id'],
    orderNo: string,
    card_type: string,
    exp_month: string,
    exp_year: number,
    cvv: string,
    card_number: string,
    total_price: number,
    currency: string,
    source: string,
    description: string,
    status: string,
    payment_response: string,
    raw_payment_response: string,
    isDeleted: boolean

}

export interface PaymentDocument extends PaymentInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date
}

const paymentSchema = new mongoose.Schema({
    orderNo: {type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    card_type: { type: String, required: true },
    exp_month: { type: String, required: true },
    exp_year: { type: Number, required: true },
    cvv: { type: String, required: true },
    card_number: { type: String, required: true },
    total_price: { type: Number, required: true },
    currency: { type: String, required: true },
    source: { type: String, required: false },
    description: { type: String, required: true },
    status: { type: String,enum: ['0','1','2'], default:'0' },
    payment_response: { type: String, required: false },
    raw_payment_response: { type: String, required: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});






const PaymentModel = mongoose.model<PaymentDocument>("Payments", paymentSchema);
export default PaymentModel;
