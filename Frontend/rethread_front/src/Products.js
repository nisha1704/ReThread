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


function Products() {

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category, subcat } = useParams();
  console.log(category, subcat)

  // Map numeric category values to category names
  const categoryMap = {
    '1': 'women',
    '2': 'men',
    '3': 'kids',
    '4': 'footwear',
    '5': 'accessories',
  };

  // Remove specific words (women, men, children, all) from the beginning
  const wordsToRemove = ['women', 'men', 'children', 'all'];
  const regex = new RegExp(wordsToRemove.join("|"), "gi");
  const filteredWords = subcat.replace(regex, '');

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:10000/${categoryMap[category]}/${filteredWords}/products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, filteredWords]); // Added dependencies



  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };
  { console.log(searchQuery) }




  { console.log("This is it", filteredProducts) }

  const handleColorChange = color => {
    setSelectedColors(prevSelectedColors => {
      let newSelectedColors;
      if (prevSelectedColors.includes(color)) {
        newSelectedColors = prevSelectedColors.filter(selectedColor => selectedColor !== color);
      } else {
        newSelectedColors = [...prevSelectedColors, color];
      }
      handleCheckClick(newSelectedColors, selectedSizes);
      return newSelectedColors;
    });
  };

  const handleSizeChange = size => {
    setSelectedSizes(prevSelectedSizes => {
      let newSelectedSizes;
      if (prevSelectedSizes.includes(size)) {
        newSelectedSizes = prevSelectedSizes.filter(selectedSize => selectedSize !== size);
      } else {
        newSelectedSizes = [...prevSelectedSizes, size];
      }
      handleCheckClick(selectedColors, newSelectedSizes);
      return newSelectedSizes;
    });
  };

  const handleCheckClick = (newSelectedColors, newSelectedSizes) => {
    const newFilteredProducts = products.filter(product =>
      (newSelectedColors.length === 0 || newSelectedColors.includes(product.color)) &&
      (newSelectedSizes.length === 0 || newSelectedSizes.includes(product.size))
    );
    // Update state with filtered products
    setFilteredProducts(newFilteredProducts);
  }

  // const handleColorChange = color => {
  //   setSelectedColors(prevSelectedColors => {
  //     let newSelectedColors;
  //     if (prevSelectedColors.includes(color)) {
  //       newSelectedColors = prevSelectedColors.filter(selectedColor => selectedColor !== color);
  //     } else {
  //       newSelectedColors = [...prevSelectedColors, color];
  //     }
  //     handleCheckClick(newSelectedColors, selectedSizes);
  //     return newSelectedColors;
  //   });
  // };

  // const handleSizeChange = size => {
  //   setSelectedSizes(prevSelectedSizes => {
  //     let newSelectedSizes;
  //     if (prevSelectedSizes.includes(size)) {
  //       newSelectedSizes = prevSelectedSizes.filter(selectedSize => selectedSize !== size);
  //     } else {
  //       newSelectedSizes = [...prevSelectedSizes, size];
  //     }
  //     handleCheckClick(selectedColors, newSelectedSizes);
  //     return newSelectedSizes;
  //   });
  // };



  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };
  { console.log(priceRange) }


  const handleSearchClick = () => {
    console.log("Filter triggered")
    const filteredProducts = products.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Update state with filtered products
    setFilteredProducts(filteredProducts);
    { console.log(filteredProducts) }
  }


  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div style={{ width: '18%', backgroundColor: '#f0f0f0', padding: '20px', alignContent: 'center', alignItems: 'center', height: '100%', overflowY: 'auto' }}>
          <h2>Filters</h2>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box className="selectColor" style={{ width: '90%', marginTop: '20px', backgroundColor: 'white', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Select Color</h3>
            <FormGroup column aria-label="color" name="color" value={selectedColors} onChange={handleColorChange}>
              <FormControlLabel
                value="Maroon"
                control={<Checkbox checked={selectedColors.includes('Maroon')} onChange={() => handleColorChange('Maroon')} style={{ color: 'Maroon' }} />}
                label="Maroon"
              />
              <FormControlLabel
                value="Red"
                control={<Checkbox checked={selectedColors.includes('Red')} onChange={() => handleColorChange('Red')} style={{ color: 'Red' }} />}
                label="Red"
              />
              <FormControlLabel
                value="Pink"
                control={<Checkbox checked={selectedColors.includes('Pink')} onChange={() => handleColorChange('Pink')} style={{ color: 'Pink' }} />}
                label="Pink"
              />
              <FormControlLabel
                value="Orange"
                control={<Checkbox checked={selectedColors.includes('Orange')} onChange={() => handleColorChange('Orange')} style={{ color: 'Orange' }} />}
                label="Orange"
              />
              <FormControlLabel
                value="Green"
                control={<Checkbox checked={selectedColors.includes('Green')} onChange={() => handleColorChange('Green')} style={{ color: 'Green' }} />}
                label="Green"
              />
              <FormControlLabel
                value="Black"
                control={<Checkbox checked={selectedColors.includes('Black')} onChange={() => handleColorChange('Black')} style={{ color: 'Black' }} />}
                label="Black"
              />
              <FormControlLabel
                value="Navy"
                control={<Checkbox checked={selectedColors.includes('Navy')} onChange={() => handleColorChange('Navy')} style={{ color: 'Navy' }} />}
                label="Navy"
              />
              <FormControlLabel
                value="Blue"
                control={<Checkbox checked={selectedColors.includes('Blue')} onChange={() => handleColorChange('Blue')} style={{ color: 'Blue' }} />}
                label="Blue"
              />
              <FormControlLabel
                value="Yellow"
                control={<Checkbox checked={selectedColors.includes('Yellow')} onChange={() => handleColorChange('Yellow')} style={{ color: 'Yellow' }} />}
                label="Yellow"
              />
              <FormControlLabel
                value="White"
                control={<Checkbox checked={selectedColors.includes('White')} onChange={() => handleColorChange('White')} style={{ color: 'White' }} />}
                label="White"
              />
              <FormControlLabel
                value="Grey"
                control={<Checkbox checked={selectedColors.includes('Grey')} onChange={() => handleColorChange('Grey')} style={{ color: 'Grey' }} />}
                label="Grey"
              />
              {/* Add other color options as needed */}
            </FormGroup>
          </Box>

          <Box className="selectSize" style={{ width: '90%', marginTop: '20px', backgroundColor: 'white', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Select Size</h3>
            <FormGroup column aria-label="size" name="size" value={selectedSizes} onChange={handleSizeChange}>
              <FormControlLabel
                value="XS"
                control={<Checkbox checked={selectedSizes.includes('XS')} onChange={() => handleSizeChange('XS')} />}
                label="XS"
              />
              <FormControlLabel
                value="S"
                control={<Checkbox checked={selectedSizes.includes('S')} onChange={() => handleSizeChange('S')} />}
                label="S"
              />
              <FormControlLabel
                value="M"
                control={<Checkbox checked={selectedSizes.includes('M')} onChange={() => handleSizeChange('M')} />}
                label="M"
              />
              <FormControlLabel
                value="L"
                control={<Checkbox checked={selectedSizes.includes('L')} onChange={() => handleSizeChange('L')} />}
                label="L"
              />
              <FormControlLabel
                value="XL"
                control={<Checkbox checked={selectedSizes.includes('XL')} onChange={() => handleSizeChange('XL')} />}
                label="XL"
              />
              <FormControlLabel
                value="XXL"
                control={<Checkbox checked={selectedSizes.includes('XXL')} onChange={() => handleSizeChange('XXL')} />}
                label="XXL"
              />
            </FormGroup>
          </Box>

          <Box className="selectPrice" style={{ width: '90%', marginTop: '20px', backgroundColor: 'white', padding: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Set Price Range</h3>
            <Slider
              sx={{ width: '90%' }}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              aria-labelledby="range-slider"
              marks={priceMarks}
            />
          </Box>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Showing Results for Products</h1>

          <Box
            style={{
              backgroundColor: 'white',
              boxShadow: '0 5px 5px rgba(0, 0, 0, 0.3)',
              height: 'fit-content',
              overflowY: 'hidden',
              padding: '10px',
              marginTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
              <Card
                key={product.id} // Use a unique identifier for the key
                className='animate_from_bottom'
                sx={{ width: 250, height: 350, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}
              >
                <Link to={`/item/${product.product_name}`} style={{textDecoration:'none'}}> {/* Wrap CardActionArea with Link */}
                  <CardActionArea>
                    <CardMedia component="img" height="190" src={product.front_img ? product.front_img : 'https://source.unsplash.com/random/1920x1080/?dress,'+product.product_name.split(/[ ,]+/)[0]} alt={product.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" style={{color:'black'}}>
                        {product.product_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {product.size}
                      </Typography>
                      <Typography variant="h6" color='black'>
                        Price: Rs {product.price}
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

export default Products;
