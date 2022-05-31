import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import log from '../utils/logger';

export async function createUser( input: DocumentDefinition<Omit<UserDocument, "createdAt"|"updatedAt"|"comparePassword"|"role">> ){
    try{
        const createUserData = await UserModel.create(input);
        return omit(createUserData.toJSON(), 'password');

    }catch(e: any){
        throw new Error(e)
    }
}

export async function validatePassword({email, password}:{email: string, password:string}) {
    const user = await UserModel.findOne({email});

    log.info("User found: "+ JSON.stringify(user))

    if(!user) return false;

    const isValid = await user.comparePassword(password);

    log.info("User valid? : "+ JSON.stringify(isValid))

    if(!isValid) return false;


    return omit(user.toJSON(), 'password');
}


    export async function findUser(input: DocumentDefinition<Omit<UserDocument, "createdAt"|"updatedAt"|"password"|"email"|"role">> ) {
        return UserModel.findOne(input).lean();
    }

    export async function getUser(input:any) {
        const user = await UserModel.findOne(input).lean();
        return omit(user, 'password'); 
    }

    export async function getAllUsers() {
        const allUsers = await UserModel.find({},{"password":0}).lean();
        return allUsers;
    }

    export async function findAndUpdateUser(
        query: FilterQuery<UserDocument>, 
        update: UpdateQuery<UserDocument>, 
        options: QueryOptions = {lean: true, isDeleted: false}
        ){
        return UserModel.findOneAndUpdate(query, update, options);
    }