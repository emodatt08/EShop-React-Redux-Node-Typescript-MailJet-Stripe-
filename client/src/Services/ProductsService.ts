import axios from "axios";
import { configs } from "../app-configs";
import http from "../http-common";
import Iproducts from "../Types/Iproducts";
const getAll = (page:number, limit:number) => {
  return http.get<Array<Iproducts>>("/products?page="+page+"&limit="+limit);
};
const get = (id: any) => {
  return http.get<Iproducts>(`/products/${id}`);
};
const create = (data: Iproducts) => {
  return http.post<Iproducts>("/products", data);
};
const addProductImage = (data:any, id:any) => {
  return axios.post(`${configs.apiUrl}/products/upload/${id}`, data, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("user")
    }
  });

};
const update = (id: any, data: Iproducts) => {
  return http.put<any>(`/products/${id}`, data);
};
const remove = (id: any) => {
  return http.delete<any>(`/products/${id}`);
};

const ProductsService = {
  getAll,
  get,
  create,
  update,
  remove,
  addProductImage
};
export default ProductsService;