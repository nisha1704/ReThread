import React, { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Sell from './Sell';
import Shop from './Shop';
import Products from './Products';
import Signup from './Signup';
import Login from './Login';
import Item from './Item';
import SellingForm from './SellingForm';
import Cart from './Cart';
import Resell from './Resell';
import PageNotFound from './PageNotFound';
import Profile from './Profile';
import Orders from './Orders';
import ModifyUserDetails from './ModifyUserDetails';
import ModifyProductDetails from './ModifyProductDetails';
import Subcategory from './Subcategory';
import ResellItem from './ResellItem';


// Create AppContext
export const AppContext = createContext({ user: {}, totalQuantity: 0, setUser: () => {}, setTotalQuantity: () => {}});



function App() {
  const [totalQuantity, setTotalQuantity] = useState(0); // Total quantity state
  const [user, setUser] = useState({
    user_name:"",
    email:"",
    type:0,
    contact:"",
    address:"",
    earning:0,
    cart:[],
    orders:[],
    resell_cart:[],
    password:null
  });
  return (
    <BrowserRouter>
      {/* Provide AppContext to all children */}
      <AppContext.Provider value={{ user, totalQuantity, setUser, setTotalQuantity }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} index />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/resell-products" element={<Resell />} />
          <Route path="/resellitem/:id" element={<ResellItem />} />
          <Route path="/products/:category/:subcat" element={<Products />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/selling-form" element={<SellingForm />} />
          <Route path="/subcategory/:id" element={<Subcategory />} />
          <Route path="/item/:id" element={<Item/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/modify-user-details" element={<ModifyUserDetails />} />
          <Route path="/modify-product-details" element={<ModifyProductDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;



