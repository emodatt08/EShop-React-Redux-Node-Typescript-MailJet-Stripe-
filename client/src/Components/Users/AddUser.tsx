import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../Reducers/UserReducer";

import { useDispatch } from "react-redux";

import { createUser } from "../../Actions/UserActions";

export default function AddUser(){
  const [userName , setUserName] = useState("");
  const [userEmail , setUserEmail] = useState("");
  const [userRole , setUserRole] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {user} = useSelector<RootState, UserState>((state) => state.users);

  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);

  const {userInfo} = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = userInfo ? userInfo.username : navigate("/");
  
  const handleChange = (e: any) => {
    const { name, value } = e.target; 
    if (name === "name") {
      setUserName(value);
    } else if (name === "email") {
      setUserEmail(value);
    } else if (name === "role") {
      setUserRole(value);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch<any>(createUser({
      name: userName,
      email: userEmail,
      role: userRole
    }));

    setIsLoaded(true);
      clearForm();
      setTimeout(() => {  
        setIsLoaded(false);
        navigate("/users ");
      }, 3000);
    
  
  }


  const clearForm = () => {
    setUserName("");
    setUserEmail("");
    setUserRole("");
  }
  
  return (
    <div className="container">
      <header className="jumbotron">
      </header>
     <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {isLoaded ? (  <span className="">{user &&  user.hasOwnProperty("_id") ? "Successfully Saved" : "Not Successful"}</span>):("")}
                <h5 className="card-title">Add User</h5>
                <span className="card-text">
                  <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                    <div className="form-group">
                      <label htmlFor="name">User Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        defaultValue={userName}
                        placeholder="Enter User Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="number"
                        className="form-control"
                        name="email"
                        id="email"
                        defaultValue={userEmail}
                        onChange={handleChange}
                        placeholder="Enter User Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select className="form-control" name="role" id="role" onChange={handleChange} defaultValue={userRole}>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
                    </button>
                  </form>
                </span>
           
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

