import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OrderModel, { OrderDocument } from "../models/order.model";

export async function createOrder(
    params:DocumentDefinition<Omit<OrderDocument, "createdAt" | "updatedAt" | "delivered" | "fulfiled" | "declineMessage" | "order_status" | "isDeleted">>) {
    return OrderModel.create(params);
}

export async function findOrder(
    query: FilterQuery<OrderDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return OrderModel.findOne(query, {}, options).populate('productIds').populate('user');
}
    

export async function getOrders(query: FilterQuery<OrderDocument>, options: QueryOptions = {lean: true, isDeleted: false}) {
    return OrderModel.find(query, {}, options).populate('productIds').populate('user',{"password":0});
}
 

export async function findAndUpdateOrder(
    query: FilterQuery<OrderDocument>, 
    update: UpdateQuery<OrderDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return OrderModel.findOneAndUpdate(query, update, options);
}
    

export  async function deleteOrder( query: FilterQuery<OrderDocument>,options: QueryOptions = {isDeleted: false} ) {
    // ProductModel.deleteOne(query);
    return OrderModel.findOneAndDelete(query, options);     
}

