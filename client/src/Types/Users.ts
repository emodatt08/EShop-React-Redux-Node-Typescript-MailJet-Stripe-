interface Session {
    id?: string,
    user?: string,
    valid?: Boolean,
    userAgent?: string,
    created?: Date,
    updated?: Date
}
export default interface Users extends Session{
    responseCode?: number;
    _id?: string,
    name?: string,
    username?: string,
    email?: string,
    password?: string,
    role?: string,
    sessions?:Session[],
    createdAt?: Date,
    updatedAt?: Date
}