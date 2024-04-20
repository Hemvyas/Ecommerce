import './App.css';
import Cart from './Cart';
import Product from './Product';
import Home from './Home';
import ProductList from './ProductList';
import Register from './Register';
import Login from './Login';
import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Pay from './components/Pay';
import { useSelector } from 'react-redux';
import { Helmet } from "react-helmet";


function App() {
  const user=useSelector(state=>state.user.currentUser)
  return (
    <>
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' https://cdn.segment.com;"
        />
      </Helmet> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
