import http from "../http-common";
import Auth from "../Types/Auth";

const authenticate = async(params:Auth) => {
  return await http.post("/sessions", params).then((response) => {
    if (response.status === 200 && response.data) {
      localStorage.setItem("user", response.data.accessToken);
    }
    return response.data;
  });
};

const createUser = async(username:string, email:string, password:string, role:string) => {
  return await http.post("/sessions",{username, email, password, role}).then((response) => {
    if (response.status === 200 && response.data) {
      localStorage.setItem("user", response.data.accessToken);
    }
    return response.data;
  });
};

const logout = async () => {
  console.log("before delete sessions: ", localStorage.getItem("user"));
  return await http.delete("/sessions").then((response) => {
    console.log("delete sessions: ",response);
    if (response.status === 200 && response.data) {
      console.log("inside if delete sessions: ",response);
      localStorage.setItem("user", "");
    }
    return response.data;
  });
};

const AuthService = {
    authenticate,
    createUser,
    logout
  };

  export default AuthService;