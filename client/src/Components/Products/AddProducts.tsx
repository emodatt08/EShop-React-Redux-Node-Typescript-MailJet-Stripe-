import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../Reducers/UserReducer";
import ProductList from "./ProductList";
import { useDispatch } from "react-redux";
import IProducts from "../../Types/Iproducts";
import { ProductState } from "../../Reducers/ProductReducer";
import { createProduct } from "../../Actions/ProductActions";

export default function AddProducts(){
  const [productName , setProductName] = useState("");
  const [productPrice , setProductPrice] = useState(0.0);
  const [productDescription , setProductDescription] = useState("");
  const [productImage , setProductImage] = useState("");
  const [productImageData , setProductImageData] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {storedProduct} = useSelector<RootState, ProductState>((state) => state.products);

  const userLogin = useSelector<RootState, UserState>((state) => state.userLogin);
  const {userInfo} = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = userInfo ? userInfo.username : navigate("/");
  
  const handleChange = (e: any) => {
    const { name, value } = e.target; 
    if (name === "productName") {
      setProductName(value);
    } else if (name === "productPrice") {
      setProductPrice(parseFloat(value));
    } else if (name === "productDescription") {
      setProductDescription(value);
    }
    else if (name === "productImage") {
      setProductImage(value);
      setProductImageData(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch<any>(createProduct({
      title: productName,
      price: productPrice,
      description: productDescription,
      image: productImage
    }, prepareImage()));

    setIsLoaded(true);
      clearForm();
      setTimeout(() => {  
        setIsLoaded(false);
        navigate("/products");
      }, 3000);
    
  
  }
  const prepareImage = () => {
    const formData = new FormData();
    formData.append("image", productImageData);
    return formData;
  }

  const clearForm = () => {
    setProductImage("");
    setProductDescription("");
    setProductPrice(0.0);
    setProductName("");
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
                {isLoaded ? (  <span className="">{storedProduct &&  storedProduct.hasOwnProperty("productId") ? "Successfully Saved" : "Not Successful"}</span>):("")}
                <h5 className="card-title">Add Product</h5>
                <span className="card-text">
                  <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        id="productName"
                        onChange={handleChange}
                        value={productName}
                        placeholder="Enter Product Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productPrice">Product Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="productPrice"
                        id="productPrice"
                        value={productPrice}
                        onChange={handleChange}
                        placeholder="Enter Product Price"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productDescription">Product Description</label>
                      <textarea
                        className="form-control"
                        name="productDescription"
                        id="productDescription"
                        onChange={handleChange}
                        value={productDescription}
                        rows={3}
                        placeholder="Enter Product Description"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productImage">Product Image</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="productImage"
                        id="productImage"
                        onChange={handleChange}
                      />
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

