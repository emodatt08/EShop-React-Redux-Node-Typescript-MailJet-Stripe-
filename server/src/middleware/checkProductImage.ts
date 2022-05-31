import { NextFunction, Request, Response } from "express";
import log from "../utils/logger";
import  multer from 'multer';
import  path from 'path';
import  fs from 'fs';
import config from 'config';
import projectRootPath from "../../getRootPath";

const checkProductImage = (req: Request, res: Response, next: NextFunction) => {
    try {
       
       if(!req.file) {
        
        return res.status(400).json({
            responseCode: 400,
            responseMessage: "No file uploaded"
        });
    }
         next();
    } catch (err) {
        log.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
};

export default checkProductImage;