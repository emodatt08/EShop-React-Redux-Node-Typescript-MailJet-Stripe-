import { Request, Response } from 'express';
import Moment from 'moment';
import MomentRange from 'moment-range';
import PaymentModel from '../models/payment.model';
import { createPaymentInput } from '../schema/payment.schema';
import { findOrder } from '../services/order.service';
import { createPayment, findAndUpdatePayment, getPayments } from '../services/payment.service';
import log from '../utils/logger';
import { createCharge, createPaymentToken } from '../utils/stripe-payments';

// export async function sendDateFormats(req: Request, res: Response) {
//     const moment = MomentRange.extendMoment(Moment);
//     const fromDate = moment();
//     const toDate = moment().add(10, 'years');
//     const range = moment().range(fromDate, toDate);

//     const years = Array.from(range.by('year')).map(m => m.year());
//     const months = moment.monthsShort();

//     return res.json({"months": months, "years":years, "fromDate": fromDate.format('YYYY-MM-DD'), "toDate": toDate.format('YYYY-MM-DD')});
// }


export async function getDatePaymentFormats(req: Request, res: Response) {
    const moment = MomentRange.extendMoment(Moment);
    const months = moment.monthsShort();
    const years = Array.from(moment().range(moment(), moment().add(10, 'years')).by('year')).map(m => m.year());
    return res.json({"months": months, "years":years});
}
    
export async function sendPayment(req: Request<{}, {}, createPaymentInput['body']>, res: Response) {
    
    const {card_number, exp_month, exp_year, cvv, total_price, card_type, currency, description, source} = req.body;
    const {orderNo} = req.params;
    //check orderNo exists
    const order = await findOrder({orderNo: orderNo});
    if(!order) {
        return res.status(400).json({error: "Order not found"});
    }
    //store payment data in database
    const user = res.locals.user._id;
    let storePaymentData = await createPayment({ orderNo, user, card_number, card_type, exp_month, exp_year, cvv, total_price, currency, description, source });
    log.info("storePaymentData: "+ JSON.stringify(storePaymentData));
    const token = await createPaymentToken({card_number, card_type, exp_month, exp_year, cvv, total_price, currency, description, source});
    log.info("stripePaymentToken: " + JSON.stringify(token));
    if (token && token.error) {
        return res.status(400).json(token);
    }
    const charge = await createCharge(token, { card_number, exp_month, exp_year, cvv, total_price, currency, description, source });
    log.info("stripeCharge: " + JSON.stringify(token));
    if (charge?.error) {
         //update payment data in database
        let updatePaymentData = await findAndUpdatePayment({"_id": storePaymentData._id}, {status: "2", payment_response:"payment failed", raw_payment_response: JSON.stringify(charge)}, {new: true});
        return res.status(400).json(charge);
    }
      //update payment data in database

      let updatePaymentData = await findAndUpdatePayment({"_id": storePaymentData._id}, {status: "1", payment_response:"payment successful", raw_payment_response: JSON.stringify(charge)}, {new: true});
    return res.json(updatePaymentData);

}


export async function allPayments(req:Request, res:Response){
   return  res.status(200).json(res.locals.paginatedResults);
}