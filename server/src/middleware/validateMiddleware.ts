import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger";
//currying
const validateData = (schema: AnyZodObject) => (req: Request, res: Response, next:NextFunction)=>{
    try{
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next();
    }catch(e: any){
        
        log.info(`errors in middleware: ${JSON.stringify(e.errors)}`);
        return res.json(e.errors);
    }
}

export default validateData;