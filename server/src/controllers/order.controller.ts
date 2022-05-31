
import { Request, Response } from "express";
import { createOrderInput, updateOrderInput } from "../schema/order.schema";
import { createOrder, findAndUpdateOrder, findOrder, getOrders } from "../services/order.service";
import { sendEmail } from "../utils/emailer";
import log from "../utils/logger";
import { keyGenerator } from "../utils/randomKeyGenerator";

export async function getAllOrdersHandler(req: Request, res: Response) {
    // const orders = await getOrders({
    //     isDeleted: false
    // });

    // log.info(`getAllOrdersHandler: ${orders}`);

    // if(orders.length === 0) {
    //     return res.status(404).json({
    //         responseCode: 404,
    //         responseMessage: "No orders found"
    //     });
    // }

    // res.status(200).json(orders);
    res.status(200).json(res.locals.paginatedResults);
}

export async function fulfilOrderHandler(req: Request, res: Response) {
    //find order
    const { orderNo } = req.params;
    const order = await findOrder({ orderNo });

    if (order) {
        const fulFilOrder = await findAndUpdateOrder({ orderNo }, {
            $set: {
                fulfiled: 1,
                order_status: 1
            }
        });

        if(fulFilOrder){
            //send fulfilment email
            sendEmail(order, true);
            res.status(200).json({
                responseCode: 200,
                responseMessage: "Order has been fulfiled"
            });
        }else{
            res.status(200).json({
                responseCode: 200,
                responseMessage: "Order could not be fulfiled at this time"
            });
        }

    }else{
        res.status(404).json({
            responseCode: 404,
            responseMessage: "Order not found"
        });
    }


}


export async function declineOrderHandler(req: Request, res: Response) {
    //find order
    const { orderNo } = req.params;
    const { declineMessage } = req.body;
    const order = await findOrder({ orderNo });
    log.info("DeclineMessage: " + declineMessage);

    if (order) {
        const declineOrder = await findAndUpdateOrder({ orderNo }, {
            $set: {
                declineMessage: declineMessage,
                fulfiled: 2,
                order_status: 2
            }
        });

        if(declineOrder){
            //send declineMessage email
            sendEmail(order, false);
            res.status(200).json({
                responseCode: 200,
                responseMessage: "Order has been declined"
            });
        }else{
            res.status(200).json({
                responseCode: 200,
                responseMessage: "Order could not be declined at this time"
            });
        }

    }else{
        res.status(404).json({
            responseCode: 404,
            responseMessage: "Order not found"
        });
    }


}

export async function createOrderHandler(req: Request<{}, {}, createOrderInput['body']>, res: Response) {
    let {
        quantity,
        total_price,
        delivery_location,
        delivery_date,
        longitude,
        latitude,
        productIds} = req.body;
    const user = res.locals.user._id;
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const idSize = 20;
    const orderNo = keyGenerator(idSize, alphabet)
    const orderSave =  createOrder({
        user,
        quantity,
        orderNo,
        total_price,
        delivery_location,
        delivery_date,
        longitude,
        latitude,
        productIds});
    const result = await orderSave;
    res.status(200).json(result);
}