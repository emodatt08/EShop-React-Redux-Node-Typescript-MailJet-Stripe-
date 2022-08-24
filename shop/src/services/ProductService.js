import Settings from "../settings";
import axios from "axios";

const ProductService = {
    getProducts: async () => {
        try{
           const response = await axios.get(Settings.apiUrl + 'products').then(response => {
               if(response.status === 200){
                    return response.data;
               }
              
            });
            return response;
        }catch(e){
            console.log(e);
        }
    }
}


export default ProductService;