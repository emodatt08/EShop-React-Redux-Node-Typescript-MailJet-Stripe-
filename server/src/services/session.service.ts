import { Session } from "inspector";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import { config } from "config";
import SessionModel, { SessionDocument } from "../models/session.model";
import { compareJWT, signJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId:String, userAgent:String) {
    const session = await SessionModel.create({user:userId, userAgent})
    return session;
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
  }

export async function updateSessions(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>){
    return SessionModel.updateOne(query, update);
} 

export async function reIssueAccessToken({refreshToken}:{
    refreshToken: string
}){

    const {decoded} = compareJWT(refreshToken);

    if(!decoded || !get(decoded, '_id')) return false;

    const session = await SessionModel.findById(get(decoded, '_id'))

    if(!session || !session.valid) return false;

    const user = await findUser({ _id: session.user })

    if(!user) return false;

    //create access token
    const accessToken = signJWT(
        {...user, session:session._id}, { expiresIn: config.get('accessTokenTtl') }
    )

    if(accessToken) return accessToken;

}