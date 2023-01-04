
import Header from "./partials/Header"
import Announcements from './partials/Announcements';
import Slider from './partials/Slider';
import Categories from './Categories/Categories';
import Products from './Products/Products';
import Newsletter from './partials/Newsletter';
import Footer from './partials/Footer';
import ProductList from './Products/ProductList';
import Product from './Products/Product';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Cart from './Cart/Cart';
function Home() {
  return (
    <div>
      <Announcements />
      <Header />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />  
    </div>
    
  );
}

export default Home;
