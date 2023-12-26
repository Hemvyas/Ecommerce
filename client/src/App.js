import './App.css';
import Cart from './Cart';
import Product from './Product';
import Home from './Home';
import ProductList from './ProductList';
import Register from './Register';
import Login from './Login';
import{BrowserRouter,Routes,Route} from "react-router-dom"


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:id" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
