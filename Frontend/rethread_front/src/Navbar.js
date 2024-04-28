import * as React from 'react';
import { useState , useContext} from 'react'; // Import useState hook
import { AppContext } from './App';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Drawer from './Drawer';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  const  {totalQuantity}  = useContext(AppContext);
  const [currentButton, setCurrentButton] = useState(''); // State to keep track of the current button
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleButtonClick = (buttonName, event) => {
    setCurrentButton(buttonName); // Update the state with the clicked button
  };


  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ bgcolor: "#a39984", boxShadow: 10 }} className="AppBar" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "black", fontWeight: "bold", fontFamily: "Roboto" }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>ReThread</Link>
          </Typography>

          <NavLink to="/home" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'home' ? 'current' : ''} color="inherit" sx={{ color: 'black', fontWeight: 'bold', mx: 2 }} onClick={() => handleButtonClick('home')}>
              Home
            </Button>
          </NavLink>

          <NavLink to="/about" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'aboutUs' ? 'current' : ''} color="inherit" sx={{ color: 'black', fontWeight: 'bold', mx: 2 }} onClick={() => handleButtonClick('aboutUs')}>
              About Us
            </Button>
          </NavLink>

          <NavLink to="/shop" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'shop' ? 'current' : ''} color="inherit" sx={{ color: 'black', fontWeight: 'bold', mx: 2 }} onClick={() => handleButtonClick('shop')}>
              Shop
            </Button>
          </NavLink>

          <NavLink to="/sell" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'sell' ? 'current' : ''} color="inherit" sx={{ color: 'black', fontWeight: 'bold', mx: 2 }} onClick={() => handleButtonClick('sell')}>
              Sell
            </Button>
          </NavLink>

          <NavLink to="/contact" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'contact' ? 'current' : ''} color="inherit" sx={{ color: 'black', fontWeight: 'bold', mx: 2 }} onClick={() => handleButtonClick('contact')}>
              Contact
            </Button>
          </NavLink>

          <NavLink to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'signup' ? 'current' : ''} color="inherit" sx={{ color: "black", fontWeight: 'bold', backgroundColor: 'lightgrey', mx: 1 }} onClick={() => handleButtonClick('signup')}>
              Sign Up
            </Button>
          </NavLink>

          <NavLink to="/login" style={{ textDecoration: 'none', color: 'black' }}>
            <Button className={currentButton === 'login' ? 'current' : ''} color="inherit" sx={{ color: "black", fontWeight: 'bold', backgroundColor: 'lightgray', mx: 1 }} onClick={() => handleButtonClick('login')}>
              Login
            </Button>
          </NavLink>


          <IconButton className={currentButton === 'cart' ? 'current' : ''} color="inherit" component={Link} to='/cart' onClick={() => handleButtonClick('cart')}>
            <Badge badgeContent={totalQuantity} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Drawer Component */}
          <Drawer open={isDrawerOpen} onClose={handleDrawerClose} />


        </Toolbar>
      </AppBar>
    </Box>
  );
}
