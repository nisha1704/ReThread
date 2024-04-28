// Footer.js

import React from 'react';

function Footer() {
  const listItemStyle = {
    margin: '5px 0',  // Adjust the margin as needed
    color: 'white',
    textDecoration: 'none',
  };

  const listGroupStyle = {
    margin: '0 20px',  // Adjust the margin as needed
  };

  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      textAlign: 'center',
      padding: '20px 50px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h1 style={{ marginBottom: '20px', marginTop:'60px' }}>ReThread</h1>
          <h2>Fashion Re-imagined, Affordability Re-defined</h2>
        </div>

        <div style={{ flex: 2, display: 'flex', justifyContent: 'space-around' }}>
          <div style={listGroupStyle}>
            <h3 style={{ marginBottom: '10px' }}>ONLINE SHOPPING</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={listItemStyle}>Men</li>
              <li style={listItemStyle}>Women</li>
              <li style={listItemStyle}>Kids</li>
              <li style={listItemStyle}>Footwear</li>
              <li style={listItemStyle}>Accessories</li>
            </ul>
          </div>

          <div style={listGroupStyle}>
            <h3 style={{ marginBottom: '10px' }}>CONNECT WITH US</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={listItemStyle}>Instagram</li>
              <li style={listItemStyle}>LinkedIn</li>
              <li style={listItemStyle}>Github</li>
              <li style={listItemStyle}>Facebook</li>
              <li style={listItemStyle}>Twitter</li>
            </ul>
          </div>

          <div style={listGroupStyle}>
            <h3 style={{ marginBottom: '10px' }}>CUSTOMER POLICIES</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={listItemStyle}>Contact Us</li>
              <li style={listItemStyle}>Terms Of Use</li>
              <li style={listItemStyle}>Track Your Order</li>
              <li style={listItemStyle}>Returns</li>
              <li style={listItemStyle}>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <p style={{ marginTop: '70px' }}>&copy; 2024 ReThread. All rights reserved.</p>
    </footer>
  );
}

export default Footer;



