import React, { useState, useContext, useEffect } from 'react';
import trend4 from './trend4.webp';
import trend5 from './trend5.webp';
import trend6 from './trend6.webp';
import Footer from './Footer';
import { Card, CardContent, Typography, Button } from '@mui/material';
import empty from './empty.avif';
import gliterback from "./gliterback.jpg"
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom"
import { AppContext } from './App';
import axios from 'axios';

function Cart() {
  const { user } = useContext(AppContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  
  async function updateCart () {
    console.log(user.email);
    const pro = await axios.get("http://localhost:10000/getCart/"+user.email);
    const res = await pro.data;
    const proResell = await axios.get("http://localhost:10000/getResellCart/"+user.email);
    console.log(await proResell);
    const resResell = await proResell.data;
    console.log(await res);
    let count=0;
    res.map(async(val)=>{
      let data = await axios.get("http://localhost:10000/product-by-id/"+await val);
      console.log(data.data);
      count++;
      setCartItems(prev => [...prev, {title: data.data.product_name, image: data.data.front_img, price: data.data.price, size: 's'}]);
    });
    resResell.map(async(val)=>{
      let data = await axios.get("http://localhost:10000/resell-by-id/"+await val);
      console.log(data.data);
      count++;
      setCartItems(prev => [...prev, {id: data.data._id, title: data.data.product_name, image: data.data.img_front, price: data.data.resell_price, size: data.data.size}]);
    });
  }

  useEffect(() => {
    
    if(user.email!=="") updateCart();
    // const newTotalQuantity = cartItems.length;
    // setTotalQuantity(newTotalQuantity);
    // setCartItems(newCart);
    // console.log(newCart);
    // console.log(cartItems);

  }, [user.email]);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  
  console.log(cartItems);

  {console.log("1st", totalQuantity)}

  const handleCheckout = () => {
    // Add logic for checkout
    console.log('Checkout clicked');
  };

  const handleDeleteItem = async (product_name) => {
    const res = await axios.get("http://localhost:10000/deleteCart/"+user.email+"/"+product_name);
    updateCart();
    setCartItems(prev => prev.filter(val => product_name===val.product_name));
  };

  const handleDeleteResellItem = async (id) => {
    const res = await axios.get("http://localhost:10000/deleteResellCart/"+user.email+"/"+id);
    updateCart();
    setCartItems(prev => prev.filter(val => id!==val.id));
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Change from 'row' to 'column'
        backgroundImage: `url(${gliterback})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        minHeight: '100vh', // Ensure minimum height to fill the screen
        paddingBottom: '100px',
        width: '100%',
        justifyContent: 'space-between', // Align items to flex-end
      }}>
        <div style={{ flex: 1, padding: '20px' }}>
          {user.email==="" ? <Card>
              <CardContent>
                <img src={empty} alt="Empty Cart" style={{ width: '60%', marginTop: '-35px', marginLeft: '280px' }} />
                <h1 style={{ textAlign: 'center', marginTop: '-35px' }}>Please Login!!</h1>
              </CardContent>
            </Card> : <>{cartItems.length === 0 ? (
            // Render empty cart image when the cart is empty
            <Card>
              <CardContent>
                <img src={empty} alt="Empty Cart" style={{ width: '60%', marginTop: '-35px', marginLeft: '280px' }} />
                <h1 style={{ textAlign: 'center', marginTop: '-35px' }}>Oops! Your Cart is Empty!</h1>
              </CardContent>
            </Card>
          ) : (
            // Render cards for each item in the cart
            cartItems.map((item, index) => (
              <Card key={index} style={{ marginTop: '30px', paddingTop: '10px', borderRadius: '10px', paddingBottom: '10px', marginBottom: '20px', marginLeft: '250px', boxShadow: '5px', display: 'flex', width: '65%' }}>
                <img src={item.image} alt={item.title} style={{ height: '200px', width: '200px', marginLeft: '40px' }} />
                <CardContent style={{ marginLeft: '20px' }}>
                  <Typography variant="h5" sx={{ marginTop: '10px' }}>{item.title}</Typography>
                  <Typography variant="body2">Size: {item.size}</Typography>
                  <Typography variant="body2">Price: Rs {item.price}</Typography>
                </CardContent>
                <IconButton style={{ marginLeft: 'auto', marginRight: '30px', height:'40px', marginTop:'8%' }} onClick={() => {if(!item.id) handleDeleteItem(item.title); else handleDeleteResellItem(item.id)}} color="error">
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))
          )}</>}
        </div>

        {/* Bottombar */}
        <div style={{ flex: 0.4, padding: '20px 20px 20px 50px', height: '100vh', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '10px', textAlign: 'center' }}>Order Summary</Typography>
          <Typography variant="body1" style={{ textAlign: 'center' }}>Total Price: Rs {user.cart.length+user.resell_cart.length}</Typography>
          <Typography variant="body1" style={{ textAlign: 'center' }}>Quantity: {cartItems.length}</Typography>
          {console.log(totalQuantity)}
          {/* Ordered List of Product Titles */}
          <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '10px', marginLeft: '25px' }}>Products in Cart:</Typography>
          <ol style={{ fontSize: '15px' }}>
            {cartItems.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ol>
          <Link to="/checkout" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button sx={{
              backgroundColor: '#4d3d18',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3b2e12',
              },
              padding: '10px 20px',
              borderRadius: '5px',
              marginTop: '30px',
              marginBottom: '20px',
              fontSize: '16px',
              fontWeight: 'bold',
              alignItems: 'center',
              width: '45%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }} onClick={handleCheckout}>
              Checkout
            </Button>
          </Link>

          <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button sx={{
              backgroundColor: 'white',
              color: '#4d3d18',
              border: '2px solid #4d3d18',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
              padding: '10px 20px',
              borderRadius: '5px',
              marginTop: '20px',
              marginBottom: '20px',
              fontSize: '16px',
              fontWeight: 'bold',
              alignItems: 'center',
              width: '45%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}>
              Keep Shopping
            </Button>
          </Link>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
