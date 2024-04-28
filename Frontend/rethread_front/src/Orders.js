import React, { useState } from 'react';
import trend4 from './trend4.webp';
import trend5 from './trend5.webp';
import trend6 from './trend6.webp';
import Footer from './Footer';
import { Card, CardContent, Typography, Button } from '@mui/material';
import empty from './empty.avif';
import gliterback from "./gliterback.jpg"
import noorders from './noorders.avif'

function Orders() {
  const [cartItems, setCartItems] = useState([
    { title: 'Couple Rings', image: trend4, price: 100, size: 'FreeSize' },
    { title: 'Premium Wallet', image: trend5, price: 150, size: 'Medium' },
    { title: 'Combat Boots', image: trend6, price: 300, size: '9' },
    // Add more items to the cart array as needed
  ]);


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
          {cartItems.length === 0 ? (
            // Render empty cart image when the cart is empty
            <Card>
              <CardContent>
                <img src={noorders} alt="Empty Cart" style={{ width: '35%', marginLeft: '430px' }} />
                <h1 style={{ textAlign: 'center', marginTop: '-25px' }}>Oops! No Orders Yet!</h1>
              </CardContent>
            </Card>
          ) : (
            // Render cards for each item in the cart
            
            cartItems.map((item, index) => (
              <Card key={index} style={{ marginTop: '30px', paddingTop: '20px', borderRadius: '10px', paddingBottom: '20px', marginBottom: '20px', marginLeft: '250px', boxShadow: '5px', display: 'flex', width: '65%' }}>
                <img src={item.image} alt={item.title} style={{ height: '200px', width: '200px', marginLeft: '40px' }} />
                <CardContent style={{ marginLeft: '20px' }}>
                  <Typography variant="h5" sx={{ marginTop: '10px' }}>{item.title}</Typography>
                  <Typography variant="body2">Size: {item.size}</Typography>
                  <Typography variant="body2">Price: Rs {item.price}</Typography>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
