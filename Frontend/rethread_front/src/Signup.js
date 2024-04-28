import React, { useState } from 'react'
import gliterback from "./gliterback.jpg"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Footer from './Footer';
import customerImage from "./customer.png";
import adminImage from "./admin.png";
import arrow from './arrow.png'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('');
  const [details, setDetails] = useState({
    user_name:"",
    email:"",
    type:0,
    contact:"",
    address:"",
    earning:0,
    cart:[],
    orders:[],
    password:null
  })
  const handleAccountTypeClick = (type_name) => {
    setAccountType(type_name);
    setDetails(prevData => ({
      ...prevData,
      ["type"]: type_name==="customer" ? 0: 1,
    }));
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  const notify = () => toast.success("Signed Up Successfully!");

  const handleSignup = async () => {
    console.log(details);
    try {
      // Send POST request to server with user data
      const response = await axios.post('http://localhost:10000/new-user', details);
      // Display success message
      toast.success(response.data);
      notify();
      setTimeout(()=>navigate("/login"), 3000);
    } catch (error) {
      // Display error message if request fails
      console.log(error);
    }
  }

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        {/* Left part of the screen */}
        <div style={{
          backgroundImage: `url(${gliterback})`,
          marginTop: '10px',
          backgroundSize: 'cover',
          height: '100vh',
          width: '50%', // Use 50% to take half of the screen
        }}>
          <h3 style={{ fontSize: 40, fontWeight: "bolder", paddingTop: '30px', marginTop: 30, textAlign: "left", marginLeft: '175px' }}>Choose Account Type</h3>
          <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '10px', marginTop: '40px' }}>
            <div className='zoom_in'
              onClick={() => handleAccountTypeClick('customer')}
              style={{
                cursor: 'pointer',
                border: accountType === 'customer' ? '3px solid black' : 'none',
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px'
              }}
              onMouseOver={(e) => {
                if (accountType !== 'customer') {
                  e.currentTarget.style.border = '2px solid grey';
                }
              }}
              onMouseOut={(e) => {
                if (accountType !== 'customer') {
                  e.currentTarget.style.border = 'none';
                }
              }}
              onMouseDown={(e) => {
                if (accountType !== 'customer') {
                  e.currentTarget.style.border = '3px solid black';
                }
              }}
              onMouseUp={(e) => {
                if (accountType !== 'customer') {
                  e.currentTarget.style.border = '2px solid transparent';
                }
              }}
            >
              <img src={customerImage} alt="Customer" style={{ width: 200, height: 300 }} />
              <p style={{ textAlign: 'center', marginTop: 10, fontSize: 20 }}>Customer</p>
            </div>
            <div className='zoom_in'
              onClick={() => handleAccountTypeClick('admin')}
              style={{
                cursor: 'pointer',
                border: accountType === 'admin' ? '3px solid black' : 'none',
                borderRadius: '5px',
                padding: '5px',
                marginLeft: '20px'
              }}
              onMouseOver={(e) => {
                if (accountType !== 'admin') {
                  e.currentTarget.style.border = '2px solid grey';
                }
              }}
              onMouseOut={(e) => {
                if (accountType !== 'admin') {
                  e.currentTarget.style.border = 'none';
                }
              }}
              onMouseDown={(e) => {
                if (accountType !== 'admin') {
                  e.currentTarget.style.border = '3px solid black';
                }
              }}
              onMouseUp={(e) => {
                if (accountType !== 'admin') {
                  e.currentTarget.style.border = '2px solid transparent';
                }
              }}
            >
              <img src={adminImage} alt="Admin" style={{ width: 150, height: 300, paddingLeft: '32px' }} />
              <p style={{ textAlign: 'center', marginRight: '15px', marginTop: 10, fontSize: 20 }}>Admin</p>
            </div>
          </div>
          <Button sx={{
            backgroundColor: '#4d3d18',
            color: 'white',
            '&:hover': {
              backgroundColor: '#3b2e12',
            },
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginLeft: '290px',
            marginTop: '20px'
          }} onClick={() => handleAccountTypeClick('')}>
            Clear Selection
          </Button>
        </div>

        <img src={arrow} alt="arrow 1" style={{ width: '8%', height: 150, marginLeft: 10 ,position:'absolute',zIndex: 1,top: '290px', left:'700px'}} />


        <Box sx={{
          width: 750,
          marginTop: '10px',
          marginBottom: 1,
          boxShadow: 8,
          backgroundColor: '#4d3d18',
          marginLeft: 'auto', // centers the box horizontally
          marginRight: '0px', // centers the box horizontally
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          alignItems: 'center', // centers the card horizontally
          justifyContent: 'center', // centers the card vertically
        }}>
          <Card variant="outlined" sx={{ backgroundColor: '#f7f4e9', marginTop: '-70px' }}>
            <CardContent sx={{ width: 400, display: "flex", flexDirection: "Column", alignContent: "center" }}>
              <Typography sx={{ mb: 0.5, color: "black", fontSize: 25, fontFamily: "Roboto", textAlign: "center" }} color="text.secondary">Sign Up</Typography>
              <TextField name="user_name" value={details.user_name} onChange={handleChange} id="outlined-basic" label="Name" variant="outlined" sx={{ alignContent: "center", marginTop: 2 }} />
              <TextField name="contact" value={details.contact} onChange={handleChange} id="outlined-basic" label="Mobile" type='number' variant="outlined" sx={{ alignContent: "center", marginTop: 2 }} />
              <TextField name="address" value={details.address} onChange={handleChange} id="outlined-basic" label="Address" variant="outlined" sx={{ alignContent: "center", marginTop: 2 }} />
              <TextField name="email" value={details.email} onChange={handleChange} id="outlined-basic" label="Email" type='email' variant="outlined" sx={{ alignContent: "center", marginTop: 2 }} />
              <TextField name="password" value={details.password} onChange={handleChange} id="outlined-basic" label="Password" variant="outlined" sx={{ alignContent: "center", marginTop: 2 }} />
              <Button sx={{
                backgroundColor: '#4d3d18',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#3b2e12',
                },
                padding: '10px 20px',
                borderRadius: '5px',
                marginTop: 3,
                fontSize: '16px',
                fontWeight: 'bold',
              }} onClick={handleSignup}>
                Sign Up
              </Button>
              <ToastContainer/>
            </CardContent>
          </Card>
        </Box>
      </div>
      <Footer />
    </>
  )
}

export default Login;

