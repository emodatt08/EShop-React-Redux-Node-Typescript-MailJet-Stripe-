import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { login } from "../../Actions/UserActions";
import { UserState } from "../../Reducers/UserReducer";
import { RootState } from "../../store";


export default function Login(){
  const form = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
  const {userInfo} = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/products");
    }
  }, [userInfo, navigate]);
  


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //set dispatch to login
    dispatch<any>(login(email, password));
    setLoading(false);
    navigate("/products");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  

  return (
    <div className="col-md-6 mx-auto">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin} >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={handleChange}
           
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <button className="btn btn-primary btn-large" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
          <button  className="btn btn-primary  btn-large" style={{ display: "none" }} />
        </div>
      </form>
    </div>
  );
};

