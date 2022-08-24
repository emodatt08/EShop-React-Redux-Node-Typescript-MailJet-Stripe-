
import './App.css';
import { BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";

import Header from "./components/partials/Header"
import Announcements from './components/partials/Announcements';
import Slider from './components/partials/Slider';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Newsletter from './components/partials/Newsletter';
import Footer from './components/partials/Footer';
function App() {
  return (
    <div className="App">
      <Announcements />
      <Header />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
      <Router>
        <Routes>
            {/* <Route  path="/"  element={<Products/>} /> */}
          
            <Route>404 Not Found!</Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
