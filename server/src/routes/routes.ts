import { Express, Request, Response } from 'express';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from '../controllers/session.controller';
import { createUserHandler, getAllUsersHandler, getUserHandler, updateUserHandler } from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import validateData from '../middleware/validateMiddleware';
import { createSessionSchema } from '../schema/session.schema';
import { createUserSchema } from '../schema/user.schema';

import { createProductSchema, getProductSchema, updateProductSchema, deleteProductSchema} from '../schema/product.schema';
import { createProductHandler,  getProductHandler, updateProductHandler, deleteProductHandler, getAllProductsHandler, uploadProductHandler, getProductImageHandler } from '../controllers/product.controller';
import { createOrderSchema } from '../schema/order.schema';
import { createOrderHandler, declineOrderHandler, fulfilOrderHandler, getAllOrdersHandler } from '../controllers/order.controller';
import { allPayments, getDatePaymentFormats, sendPayment } from '../controllers/payment.controller';
import { createPaymentSchema } from '../schema/payment.schema';
import paginatedResults from '../middleware/paginationMiddleware';
import ProductModel from '../models/products.model';
import OrderModel from '../models/order.model';
import PaymentModel from '../models/payment.model';


 
function routes(app: Express){
    app.get('/health/check', (req: Request, res: Response) => {
        return res.json({"responseCode": 200, "responseMessage": "Success"})
    })

    app.post('/api/users', validateData(createUserSchema), createUserHandler);
    
    app.get('/api/users', requireUser, getAllUsersHandler);

    app.get('/api/users/:id', requireUser, getUserHandler);

    app.put('/api/users/:id', requireUser, updateUserHandler);

    app.post('/api/sessions', validateData(createSessionSchema), createUserSessionHandler);
    
    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);


    app.get('/api/products',paginatedResults.productPaginatedResults(ProductModel), getAllProductsHandler);

    app.get('/api/products/:productId', getProductHandler);

    app.get('/api/products/image/:productId', getProductImageHandler);

    app.post('/api/products/upload/:productId', uploadProductHandler);

    app.post('/api/products', [requireUser, validateData(createProductSchema)], createProductHandler);

    app.put('/api/products/:productId', [requireUser, validateData(updateProductSchema)], updateProductHandler);

    app.get('/api/products/:productId', [validateData(getProductSchema)], getProductHandler);

    app.delete('/api/products/:productId', [requireUser, validateData(deleteProductSchema)], deleteProductHandler);


    app.post('/api/order', [requireUser, validateData(createOrderSchema)], createOrderHandler);

    app.get('/api/orders',[requireUser, paginatedResults.orderPaginatedResults(OrderModel)],  getAllOrdersHandler);

    app.post('/api/fulfil/order/:orderNo', requireUser, fulfilOrderHandler);

    app.post('/api/decline/order/:orderNo', requireUser, declineOrderHandler);


    app.get('/api/get/payment/dates',requireUser,  getDatePaymentFormats);

    app.get('/api/all/payments', [requireUser, paginatedResults.productPaginatedResults(PaymentModel)], allPayments);
    
    app.post('/api/make/payment/:orderNo', [requireUser,  validateData(createPaymentSchema)], sendPayment);

}

export default routes;