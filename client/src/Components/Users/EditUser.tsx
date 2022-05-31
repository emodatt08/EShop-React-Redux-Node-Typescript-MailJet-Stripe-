import React, { useEffect, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../Reducers/UserReducer";

import { useDispatch } from "react-redux";

import { getOneUser, updateUser } from "../../Actions/UserActions";
import Users from "../../Types/Users";

export default function EditUser(){
  const [userName , setUserName] = useState("");
  const [userEmail , setUserEmail] = useState("");
  const [userRole , setUserRole] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {userEdit, userUpdate} = useSelector<RootState, UserState>((state) => state.users);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();  
  
  useEffect(() => {
    dispatch<any>(getOneUser(id));
    const redirect = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')! ) : navigate('/');
  }, [dispatch, id]);

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
    dispatch<any>(updateUser( id,{
      name: userName ? userName : userEdit?.name,
      email: userEmail ? userEmail : userEdit?.email,
      role: userRole ? userRole : userEdit?.role
    }));
    

    dispatch<any>(getOneUser(id));
    setIsLoaded(true);
      clearForm();
      setTimeout(() => {  
        setIsLoaded(false);
        navigate("/users");
      }, 3000);
    
  
  }

  const convertDate = (date: string | Date | undefined) => {
    const newDate = new Date(date ?? "");
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
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
                {isLoaded ? (  <span className="">{userEdit &&  userEdit.hasOwnProperty("_id") ? "Successfully Saved" : "Not Successful"}</span>):("")}
                <h5 className="card-title">Edit User</h5>
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
                        defaultValue={userEdit?.name}
                        placeholder="Enter User Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        defaultValue={userEdit?.email}
                        onChange={handleChange}
                        placeholder="Enter User Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select className="form-control" name="role" id="role" onChange={handleChange}>
                        <option value="">Select Role</option>
                        {userEdit?.role === "admin" ? (
                          
                          <option value="admin" selected>
                            Admin
                            </option>
                            ) : (
                              <option value="admin">Admin</option>
                            )}
                        {userEdit?.role === "user" ? (

                          <option value="user" selected>
                            User
                            </option>
                            ) : (
                              <option value="user">User</option>
                            )}
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
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Session ID</th>
            <th>Valid</th>
            <th>User Agent</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {userEdit && userEdit?.sessions?.map((sessions: Users) => (
            <tr key={sessions._id}>
              <td>{sessions._id}</td>
              <td>{sessions.valid ? "true":"false"}</td>
              <td>{sessions.userAgent}</td>
              <td>{convertDate(sessions.createdAt)}</td>
              <td>{convertDate(sessions.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

