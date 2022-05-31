import {object, number, string, date, TypeOf} from 'zod';
import { z } from "zod";

const payload = {
    body: object({
        productIds: string({
            required_error: 'Product IDs is required',
        }).array(),
        quantity: number({
            required_error: 'Quantity is required',
        }).min(1, 'Quantity should be more than 1').max(10, 'Quantity should be less than 10 chars'),
        total_price: number({
            required_error: 'Total Price is required',
        }).min(1, 'Total price should be more than 1').max(4000000, 'Total price should be less than 400000 chars'),
        delivery_location: string({
            required_error: 'Delivery Location is required',
        }),
        delivery_date: z.preprocess((arg) => {
            if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
          }, z.date()),
        longitude: string({
            required_error: 'Longitude is required',
        }).min(1, 'latitude should be more than 1.0').max(90, 'latitude should be less than 90.0'),
        latitude: string({
            required_error: 'Latitude is required',
        })
    })
}

const params = {
    params: object({
        orderNo: string({
            required_error: 'OrderNo is required'
        })
    })
}

export const createOrderSchema = object({
    ...payload,

});

export const updateOrderSchema = object({
    ...payload,
    ...params

});

export const deleteOrderSchema = object({
    ...params
});

export const getOrderSchema = object({
    ...params
});


export type createOrderInput = TypeOf<typeof createOrderSchema>;
export type updateOrderInput = TypeOf<typeof updateOrderSchema>;
export type deleteOrderInput = TypeOf<typeof deleteOrderSchema>;
export type getOrderInput = TypeOf<typeof getOrderSchema>;

