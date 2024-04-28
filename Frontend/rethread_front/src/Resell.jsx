import React from 'react';
import { Box, Checkbox, TextField, IconButton, InputAdornment, FormGroup, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom"
import Footer from './Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const domain = process.env.REACT_APP_DOMAIN

const priceMarks = [
  {
    value: 0,
    label: '0'
  },
  {
    value: 20,
    label: '100',
  },
  {
    value: 40,
    label: '500',
  },
  {
    value: 60,
    label: '1000',
  },
  {
    value: 80,
    label: '1500',
  },
  {
    value: 100,
    label: '2000',
  }
];

function valuetext(label) {
  return `${label}`;
}


function Resell() {
    const [resell, setResell] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:10000/all-resell-products`)
      .then((response) => {
        setResell(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Added dependencies


  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ width: '100%%', backgroundColor: '#f0f0f0', padding: '20px', alignContent: 'center', alignItems: 'center', height: '100%', overflowY: 'auto' }}>
          <Box
            style={{
              backgroundColor: 'white',
              boxShadow: '0 5px 5px rgba(0, 0, 0, 0.3)',
              height: 'fit-content',
              overflowY: 'hidden',
            //   width: '100vw',
              flexDirection: 'row',
              padding: '10px',
              marginTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {resell.map((product) => (
              <Card
                key={product._id} // Use a unique identifier for the key
                className='animate_from_bottom'
                sx={{ width: 250, height: 350, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}
              >
                <Link to={`/resellitem/${product._id}`} style={{textDecoration:'none'}}> {/* Wrap CardActionArea with Link */}
                  <CardActionArea>
                    <CardMedia component="img" height="190" src={product.img_front ? product.img_front : 'https://source.unsplash.com/random/1920x1080/?dress,'+product.product_name.split(/[ ,]+/)[0]} alt={product.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" style={{color:'black'}}>
                        {product.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {product.size}
                      </Typography>
                      <Typography variant="h6" color='black'>
                        Price: Rs {product.resell_price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            ))}
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Resell;
