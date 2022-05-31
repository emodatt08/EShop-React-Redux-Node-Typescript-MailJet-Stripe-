import mongoose from 'mongoose';

import { UserDocument } from './user.model';



export interface UserInput{
    user: UserDocument['_id'],
    productId: string,
    title: string,
    description: string,
    price: number,
    image: string,
    isDeleted: boolean

}

export interface ProductDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date
}

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});






const ProductModel = mongoose.model<ProductDocument>("Products", productSchema);
export default ProductModel;
