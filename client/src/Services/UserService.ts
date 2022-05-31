import http from "../http-common";
import Users from "../Types/Users";

const getAllUsers = () => {
  return http.get<Array<Users>>("/users");
};
const getAUser = (id: any) => {
    return http.get<Users>(`/users/${id}`);
};

const updateAUser = (id: any, user:any) => {
  return http.put<Users>(`/users/${id}`, user);
};
const createAUser = (user:any) => {
    return http.post<Users>("/users", user);
};


const UserService = {
    getAllUsers,
    getAUser,
    updateAUser,
    createAUser
};
export default UserService;