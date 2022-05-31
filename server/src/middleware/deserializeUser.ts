import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session.service";
import { compareJWT } from "../utils/jwt.utils";
import log from "../utils/logger";

const deserializeUser = (req: Request, res:Response, next: NextFunction) =>{
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"").replace(" ", "");
    const refreshToken = get(req, "headers.x-refresh", "");

    log.info("accessToken" + JSON.stringify(accessToken));
    if(!accessToken) return next()

    const {decoded, expired} = compareJWT(accessToken)
    log.info("decoded:" + JSON.stringify(decoded));

    if(decoded){
        res.locals.user = decoded;
        return next();
    }

    if(expired && refreshToken){
        const getNewAccessToken = reIssueAccessToken(refreshToken);
    }



    return next();
}

export default deserializeUser;