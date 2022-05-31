import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/products.model";

export async function createProduct(
    params:DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>) {
    return ProductModel.create(params);
}

export async function findProduct(
    query: FilterQuery<ProductDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return ProductModel.findOne(query, {}, options);
}
    

export async function getProducts(query: FilterQuery<ProductDocument>, options: QueryOptions = {lean: true, isDeleted: false}) {
    return ProductModel.find(query, {}, options);
}


export async function findAndUpdateProduct(
    query: FilterQuery<ProductDocument>, 
    update: UpdateQuery<ProductDocument>, 
    options: QueryOptions = {lean: true, isDeleted: false}
    ){
    return ProductModel.findOneAndUpdate(query, update, options);
}
    

export  async function deleteProduct( query: FilterQuery<ProductDocument>,options: QueryOptions = {isDeleted: false} ) {
    // ProductModel.deleteOne(query);
    return ProductModel.findOneAndDelete(query, options);     
}

