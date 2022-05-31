import { Request, Response } from "express";
import config  from "config";
import Session from "../models/session.model";
import { createSession, findSessions, updateSessions } from "../services/session.service";
import { findUser, validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import log from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
    //we must validate user password
    const user = await validatePassword(req.body);

    if(!user) return res.status(401).send("Invalid email or password");

    log.info('Validated User: '+ JSON.stringify(user));
    //create the session
    const session = await createSession(user._id, req.get("user-agent") || "");
    log.info('Created User Session: '+ JSON.stringify(session));
    //create access token
    const accessToken = signJWT(
        {...user, session:session._id}, { expiresIn: config.get('accessTokenTtl') }
    )

    log.info('Created Access Token: '+ JSON.stringify(accessToken));

    //create a refresh token
    const refreshToken = signJWT(
        {...user, session:session._id}, { expiresIn: config.get('refreshTokenTtl') }
    )
    
    log.info('Created Refresh Token: '+ JSON.stringify(refreshToken));

    return res.send({ accessToken, refreshToken, user:user });

}

export async function getUserSessionsHandler(req: Request, res: Response) {
    log.info('Res.Locals: '+ JSON.stringify(res.locals));
    const userId = res.locals.user._id;
    log.info('UserId: '+ JSON.stringify(userId));
    let sessions = await findSessions({user: userId, valid: true});
    const userData = await findUser(userId);
    log.info('UserData: '+ JSON.stringify(userData));
    sessions = sessions.map(session => {
        return {
            ...session,
            user: userData
        }
    })
    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session
    log.info('SessionId: '+ JSON.stringify(sessionId));
    await updateSessions({ _id: sessionId }, { valid: false });

    return res.send({accessToken: null, refreshToken: null});
}