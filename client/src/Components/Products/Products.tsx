import React, { useEffect } from "react";
import { useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../Reducers/UserReducer";
import ProductList from "./ProductList";

export default function Products(){
  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
  const {userInfo} = userLogin;
  const navigate = useNavigate();
  const name = userInfo ? userInfo.username : navigate("/");

  
  return (
    <div className="container">
      <header className="jumbotron">
      </header>
     <p><strong>Welcome {name}</strong></p>
     <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Product List</h5>
                <span className="card-text">
                 
                  <ProductList />
                </span>
           
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

