import './App.css';
import Cart from './Cart';
import Product from './Product';
import Home from './Home';
import ProductList from './ProductList';
import Register from './Register';
import Login from './Login';
import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Pay from './components/Pay';
import Search from './Search';
import { useSelector } from 'react-redux';


function App() {
  const user=useSelector(state=>state.user.currentUser)
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category/:id" element={<ProductList/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/pay' element={<Pay/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
