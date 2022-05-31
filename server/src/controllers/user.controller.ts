import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { findSessions } from "../services/session.service";
import { createUser, findAndUpdateUser, findUser, getAllUsers, getUser } from "../services/user.service";
import log from "../utils/logger";


export async function createUserHandler(req: Request<{}, {}, createUserInput['body']>, res: Response, next: any){
    try{

        const user = await createUser(req.body);
        return res.send(user);
        
    }catch(e: any){

        log.error(e)
        return res.status(409).json({"responseMessage":e.message})
    }
}

export async function updateUserHandler(req: Request, res: Response){
    try{
                const { id } = req.params;
                const { name, email, role } = req.body;
                const user = await getUser({_id:id});
                if (user) {
                    const updateProduct = await findAndUpdateUser({ _id:id }, {
                        $set: {
                            name, 
                            email, 
                            role
                        }
                    });
                    if(updateProduct){
                        const user = await getUser({_id:id});
                        return res.status(200).json(user);
                    }
                    return res.status(404).json({ message: "Could not update user" });
                } else {
                    return res.status(404).json({ message: "user not found" });
                }
            }catch(e: any){
                log.error(e)
            return res.status(409).json({"responseMessage":e.message})
        }
}


export async function getAllUsersHandler(req: Request, res: Response){
    try{
        const users = await getAllUsers();
        return res.send(users);
    }catch(e:any){
        log.error(e)
        return res.status(409).json({"responseMessage":e?.message})
    }
}

export async function getUserHandler(req: Request, res: Response){
    try{
        log.info('Res.Locals: '+ JSON.stringify(res.locals));
        const userId = req.params.id;

        log.info('UserId: '+ JSON.stringify(userId));
        let sessions = await findSessions({user: userId, valid: true});

        const userData = await getUser({_id:userId});

        log.info('UserData: '+ JSON.stringify(userData));
        sessions = sessions.map(session => {
            return {
                ...session
            }
        });

        return res.send({
            ...userData,
            sessions
        });
    }catch(e:any){
        log.error(e)
        return res.status(409).json({"responseMessage":e?.message})
    }
}