import { NextFunction, Request, Response } from "express";

const productPaginatedResults = (model: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments();
        const results = { results:{}, current_page:page, per_page:limit, total:total, next: {}, previous: {} };

        if (endIndex < total) {
            results.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit
            };
        }

        try {
            results.results = await model.find({isDeleted: false}).populate('user',{"password":0}).limit(limit).skip(startIndex).exec();
            res.locals.paginatedResults = results;
            next();
        } catch (error:any) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }       
    }
}


const orderPaginatedResults = (model: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await model.countDocuments();
        const results = { results:{}, current_page:page, per_page:limit, total:total, next: {}, previous: {} };

        if (endIndex < total) {
            results.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit
            };
        }

        try {
            results.results = await model.find({isDeleted: false}).populate('productIds').populate('user').limit(limit).skip(startIndex).exec();
            res.locals.paginatedResults = results;
            next();
        } catch (error:any) {
            console.log(error);
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }       
    }
}

const paginatedResults = {
    productPaginatedResults,
    orderPaginatedResults
}
export default paginatedResults;