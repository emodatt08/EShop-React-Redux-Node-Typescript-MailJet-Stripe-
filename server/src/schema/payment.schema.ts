import {object, number, string, TypeOf} from 'zod';

const payload = {
    body: object({
        card_type: string({
            required_error: 'Card Type is required',
        }),
        card_number: string({
            required_error: 'Card Number is required',
        }),
        exp_month: string({
            required_error: 'Expiry month is required',
        }),
        exp_year: number({
            required_error: 'Expiry year is required', 
        }).min(2018, 'Expiry year should be after 2018').max(2100, 'Expiry year should be less than the year 2100'),
        cvv: string({
            required_error: 'The cvc is required',
        }).min(3, 'The CVC is a 3 digit code').max(3, 'The CVC is a 3 digit code'),
        total_price: number({
            required_error: 'The total price of the order is required',
        }),
        currency: string({
            required_error: 'The currency of the payment is required',
        }),
        source: string({
            required_error: 'The source of the payment is required',
        }),
        description: string({
            required_error: 'Price is required',
        }).min(10, 'Description should be at least 10 characters long').max(100, 'Description should be less than 100 characters long'),
    })
}

const params = {
    params: object({
        orderNo: string({
            required_error: 'The order number is required'
        })
    })
}

export const createPaymentSchema = object({
    ...payload,
    ...params 

});

export const updatePaymentSchema = object({
    ...payload,
    ...params

});

export const deletePaymentSchema = object({
    ...params
});

export const getPaymentSchema = object({
    ...params
});


export type createPaymentInput = TypeOf<typeof createPaymentSchema>;
export type updatePaymentInput = TypeOf<typeof updatePaymentSchema>;
export type deletePaymentInput = TypeOf<typeof deletePaymentSchema>;
export type getPaymentInput = TypeOf<typeof getPaymentSchema>;

