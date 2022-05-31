import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams} from 'react-router-dom';
import { OrderState } from "../../Reducers/OrderReducer";
import { UserState } from "../../Reducers/UserReducer";
import { RootState } from "../../store";
import {declineOrderService} from "../../Actions/OrderActions";

export default function OrderOps(){
  const form = useRef();
  const [declineMessage, setDeclineMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
  const {declineOrderState} = useSelector<RootState, OrderState>((state) => state.products);
  const { isLoggedIn } = userLogin;
  const navigate = useNavigate();
  const {orderNo} = useParams();

  useEffect(() => {
    if (!userLogin) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  


  const handleDeclineService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const decline = {
      declineMessage: declineMessage,
    }
    //set dispatch to login
    dispatch<any>(declineOrderService(orderNo, decline));
    setLoading(false);
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "declineMessage") {
      setDeclineMessage(value);
    } 
  };

 


  

  return (
    <div className="col-md-6 mx-auto">
      <h1 className="text-center">Decline Order</h1>
      {isLoading ? (  <span className="">{declineOrderState && declineOrderState.hasOwnProperty("responseCode") && declineOrderState.responseCode
      === 200 ? "Successfully Declined, Email Sent!" : "Not Successful"}</span>):("")}
      <form onSubmit={handleDeclineService} >
        <div className="form-group">
          <label htmlFor="declineMessage">Decline Message</label>
          <input
            type="text"
            className="form-control"
            name="declineMessage"
            onChange={handleChange}
           
          />
        </div>

       

        <div className="form-group mt-3">
          <button className="btn btn-primary btn-large" disabled={isLoading}>
            {isLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>decline</span>
          </button>
          <button  className="btn btn-primary  btn-large" style={{ display: "none" }} />
        </div>
      </form>
    </div>
  );
};

