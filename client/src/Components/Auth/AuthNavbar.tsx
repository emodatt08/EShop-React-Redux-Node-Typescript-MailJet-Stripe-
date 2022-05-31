import React from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../App.css";
import { useDispatch } from 'react-redux';
import { logout } from '../../Actions/UserActions';
import { RootState } from '../../store';
import { UserState } from '../../Reducers/UserReducer';
import { useSelector } from 'react-redux';


function AuthNavbar() {
  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
  const {userInfo} = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch<any>(logout());
    navigate("/");
  }


  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" className="navbar-brand">
        Shop Admin
      </a>
     
       
      {userInfo && userInfo.username ? (
         <div className="navbar-nav mr-auto">

            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/payments"} className="nav-link">
                Payments/Reports
              </Link>
            </li>

          <li className="nav-item">
            <Link to={"#"} onClick={handleLogout} className="nav-link">
              Logout
            </Link>
          </li>
        </div>
        
      ):(
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
            </div>
          </nav>
        </div>
      )}
       
    </nav>
   
  </div>
  )
}

export default AuthNavbar