import { Request, Response } from "express";
import { createProductInput, getProductInput, updateProductInput } from "../schema/product.schema";
import { createProduct, findAndUpdateProduct, findProduct, getProducts } from "../services/product.service";
import log from "../utils/logger";
import { keyGenerator } from "../utils/randomKeyGenerator";
import  multer from 'multer';
import  path from 'path';
import  fs from 'fs';
import config from 'config';
import projectRootPath from "../../getRootPath";
import { readFile } from "fs/promises";

export async function getAllProductsHandler(req: Request, res: Response) {
    // const products = await getProducts({
    //     isDeleted: false
    // });

    // log.info(`getAllProductsHandler: ${products}`);

    // if(products.length === 0) { 
    //     return res.status(404).json({
    //         responseCode: 404,
    //         responseMessage: "No products found"
    //     });
    // }
    res.status(200).json(res.locals.paginatedResults);
}

export async function createProductHandler(req: Request<{}, {}, createProductInput['body']>, res: Response) {
    const {title, description, price, image } = req.body;
    const user = res.locals.user._id;
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const idSize = 20;
    const productId = keyGenerator(idSize, alphabet)
    const productSave =  createProduct({
        productId,
        user,
        title,
        description,
        price,
        image,
        isDeleted: false
    });
    const result = await productSave;
    res.status(200).json(result);
}

export async function findProductHandler(req: Request<getProductInput['params']>, res: Response) {
    const { productId } = req.params;
    const product = await findProduct({ productId });
    res.status(200).json(product);
}

export async function getProductHandler(req: Request<updateProductInput['params']>, res: Response) {
    
    const userId = res.locals.user._id;
    const { productId } = req.params;
    const product = await findProduct({ productId });

    if(!product) {
        res.status(404).json({
            message: 'Product not found'
        });
    }

    if(product.user.toString() !== userId.toString()) {
        res.status(403).json({
            message: 'You are not authorized to access this product'
        });
    }
    const productUpdate = await findAndUpdateProduct({ productId }, req.params, {
        new: true,
    });
   
    if(productUpdate){
        res.status(200).json(productUpdate);
    }
    

}

export async function updateProductHandler(req: Request<updateProductInput['params']>, res: Response) {
    const { productId } = req.params;
    const { title, description, price, image } = req.body;
    // const product = await findAndUpdateProduct({ productId }, { title, description, price, image });
    // res.status(200).json(product);

    const product = await findProduct({ productId });
    if (product) {
        const updateProduct = await findAndUpdateProduct({ productId }, {
            $set: {
                title,
                description,
                price,
                image
            }
        });
        if(updateProduct){
            const product = await findProduct({ productId });
            return res.status(200).json(product);
        }
        return res.status(404).json({ message: "Could not update product" });
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
}

export async function deleteProductHandler(req: Request, res: Response) {
    const { productId } = req.params;
    const product = await findProduct({ productId });
    if (product) {
        const deleteProduct = await findAndUpdateProduct({ productId }, {
            $set: {
                isDeleted: true
            }
        });
        if(deleteProduct){
            const product = await findProduct({ productId });
            return res.status(200).json(product);
        }else{
            return res.status(404).json({ message: "Could not delete product" });
        }
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}

export async function uploadProductHandler(req: Request, res: Response) {
    try {
       let imageName =  `${Date.now()}`;
       let imageDataName;
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = path.join(projectRootPath + config.get('uploadPath'), 'products');
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                cb(null, dir);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                imageDataName = imageName + ext;
                cb(null, imageName + ext);
                log.info(`imageFull: ${imageName + ext}`);
                
            }
        });
        const upload = multer({ storage }).single('image');
        upload(req, res, (err) => {
            if (err) {
                log.error(err);
                return res.status(400).json({
                    message: 'Image upload failed',
                    error: err
                });
            }
            if (!req.file) {
                return res.status(400).json({
                    message: 'No file selected'
                });
            }
            const image  = req.file;
            const { mimetype, size } = image;
            
            const isValidMimeType = config.get('validMimeTypes').includes(mimetype);
           
            const isValidSize = size <= config.get('maxSize');
            log.info(`isValidSize: ${size}`);
            if (!isValidMimeType || !isValidSize) {
                return res.status(400).json({
                    message: 'Invalid file type or size'
                });
            }
            log.info(`image: ${image}`);   
        });
        const { productId } = req.params;
        const product = await findProduct({ productId });
        if (product) {
            const updateProduct = await findAndUpdateProduct({ productId }, {
                $set: {
                    image: imageDataName
                }
            });
            if(updateProduct){
                const product = await findProduct({ productId });
                return res.status(200).json(product);
            }
            return res.status(404).json({ message: "Could not update product" });
        }
    } catch (err) {
        log.error(err);
        return res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

export async function getProductImageHandler(req: Request, res: Response) {
    const { productId } = req.params;
    const product = await findProduct({ productId });
    if (product) {
        const image = await readFile(path.join(projectRootPath + config.get('uploadPath'), 'products', product.image));
        res.set('Content-Type', 'image/png');
        res.send(image);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}