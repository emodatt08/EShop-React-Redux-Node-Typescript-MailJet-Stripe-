import config from "config";
import jwt from "jsonwebtoken";
import log from "./logger";

const privateKey = config.get<String>("privateKey")
const publicKey = config.get<String>("publicKey")

export function signJWT(
    object:Object, 
    options?: jwt.SignOptions | undefined) {
        const signingKey = Buffer.from(
            privateKey,
            "base64"
          ).toString("ascii");

        return jwt.sign(object, 
            signingKey)
}

export function compareJWT(token: string) {
    try{
        const signingKey = Buffer.from(
            privateKey,
            "base64"
          ).toString("ascii");

        const decoded = jwt.verify(token, signingKey);
        return{
            valid: true,
            expired: false,
            decoded
        }
    }catch(e: any){
        log.error(JSON.stringify(e))
        return{
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}