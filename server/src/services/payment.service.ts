import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PaymentModel, { PaymentDocument } from "../models/payment.model";

export async function createPayment(
    params:DocumentDefinition<Omit<PaymentDocument, "createdAt" | "updatedAt" | "status" | "payment_response" | "raw_payment_response" | "isDeleted">>) {
    return PaymentModel.create(params);
}

export async function findPayment(
    query: FilterQuery<PaymentDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return PaymentModel.findOne(query, {}, options).populate('order').populate('user', {"password":0});
}
    

export async function getPayments(query: FilterQuery<PaymentDocument>, options: QueryOptions = {lean: true, isDeleted: false}) {
    return PaymentModel.find(query, {}, options).populate('order').populate('user', {"password":0});
}


export async function findAndUpdatePayment(
    query: FilterQuery<PaymentDocument>, 
    update: UpdateQuery<PaymentDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return PaymentModel.findOneAndUpdate(query, update, options);
}
    

export  async function deletePayment( query: FilterQuery<PaymentDocument>,options: QueryOptions = {isDeleted: false} ) {
    // ProductModel.deleteOne(query);
    return PaymentModel.findOneAndDelete(query, options);     
}

