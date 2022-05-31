import axios from "axios";
import { configs } from "./app-configs";
export default axios.create({
  baseURL: configs.apiUrl,
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("user")
  }
});

