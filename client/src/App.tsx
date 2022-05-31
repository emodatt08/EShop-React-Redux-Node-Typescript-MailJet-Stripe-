import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,
  Routes,
  Route,
  useRoutes} from "react-router-dom";

import AuthNavbar from "./Components/Auth/AuthNavbar";
import Products from "./Components/Products/Products";
import AddProducts from "./Components/Products/AddProducts";
import EditProduct from "./Components/Products/EditProduct";
import Orders from "./Components/Orders/Orders";
import Login from "./Components/Auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import OrderOps from "./Components/Orders/OrderOps";
import OrderProducts from "./Components/Orders/OrderProducts";
import Users from "./Components/Users/Users";
import AddUser from "./Components/Users/AddUser";
import EditUser from "./Components/Users/EditUser";
import Payments from "./Components/Payments/Payments";
import PaymentDetails from "./Components/Payments/PaymentDetails";

function App() {
  return (
    <div className="App">
      <AuthNavbar />
            <div className="container mt-3">
              <Provider store={store}>  
                <Routes>
                
                  <Route  path="/"  element={<Login/>} />
                  <Route path="/products" element={<Products/>} />
                  <Route path="/add/products" element={<AddProducts/>} />
                  <Route path="/edit/product/:id" element={<EditProduct/>} />
                  <Route path="/decline/order/:orderNo" element={<OrderOps/>} />
                  <Route path="/order/products/:orderNo" element={<OrderProducts/>} />
                  <Route path="/payment/details/:paymentId" element={<PaymentDetails/>} />
                  <Route path="/orders" element={<Orders/>} />
                  <Route path="/users" element={<Users/>} />
                  <Route path="/add/user" element={<AddUser/>} />
                  <Route path="/edit/user/:id" element={<EditUser/>} />
                  <Route path="/payments" element={<Payments/>} />
                </Routes>
              </Provider>
            </div>
    </div>
  );
}
export default App;