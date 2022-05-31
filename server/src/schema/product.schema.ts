import {object, number, string, TypeOf} from 'zod';

const payload = {
    body: object({
        title: string({
            required_error: 'Title is required',
        }).min(2, 'Title should be more than 2').max(100, 'Title should be less than 100 chars'),
        description: string({
            required_error: 'Description is required',
        }).min(2, 'Description should be more than 2').max(500, 'Description should be less than 500 chars'),
        price: number({
            required_error: 'Price is required',
        }).min(0, 'Price should be more than 0').max(1000000, 'Price should be less than 1000000'),
        image: string({
            required_error: 'Image is required',
        }).min(2, 'Image should be more than 2').max(5000000, 'Image should be less than 5000000 chars'),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: 'ProductId is required'
        })
    })
}

export const createProductSchema = object({
    ...payload,

});

export const updateProductSchema = object({
    ...payload,
    ...params

});

export const deleteProductSchema = object({
    ...params
});

export const getProductSchema = object({
    ...params
});


export type createProductInput = TypeOf<typeof createProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
export type getProductInput = TypeOf<typeof getProductSchema>;

