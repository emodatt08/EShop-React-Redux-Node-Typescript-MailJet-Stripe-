import mongoose from 'mongoose';
import { ProductDocument } from './products.model';
import { UserDocument } from './user.model';





export interface UserInput{
    productIds: [ProductDocument['productId']],
    user: UserDocument['_id'],
    orderNo: string,
    quantity: number,
    longitude:string,
    latitude:string,
    total_price: number,
    delivery_location: string,
    delivery_date: Date,
    delivered: boolean,
    fulfiled: boolean,
    declineMessage: string,
    order_status:boolean,
    isDeleted: boolean

}

export interface OrderDocument extends UserInput, mongoose.Document{
    createdAt: Date,
    updatedAt: Date
}


const orderSchema = new mongoose.Schema({
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderNo: { type: String, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
    delivery_location: { type: String, required: true },
    delivery_date: { type: Date, required: true },
    delivered: { type: Boolean, required: false, default:0 },
    fulfiled: { type: Number,enum: [0,1,2], default:0 },
    declineMessage: { type: String, required: false },
    order_status:{type:Number,enum: [0,1,2], default:0},
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Getter
orderSchema.path('total_price').get(function(num: number) {
    return (num / 100).toFixed(2);
  });
  
// Setter
orderSchema.path('total_price').set(function(num: number) {
    return num * 100;
  });
  

const OrderModel = mongoose.model<OrderDocument>("Orders", orderSchema);
export default OrderModel;
