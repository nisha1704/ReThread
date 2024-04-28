import React, { useState } from 'react';
import Footer from './Footer'
import shoptop from './shoptop.jpg'
import shoptop2 from './shoptop2.jpg'
import shoptop3 from './shoptop3.jpg'
import shoptop5 from './shoptop5.webp'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";
import women from './women.jpg'
import men from './men.avif'
import kids from './kids.jpg'
import footwear from './footwear.avif'
import accessories from './accessories.webp'
import trend1 from './trend1.jpg'
import trend2 from './trend2.webp'
import trend3 from './trend3.jpg'
import trend4 from './trend4.webp'
import trend5 from './trend5.webp'
import trend6 from './trend6.webp'
import trend7 from './trend7.jpg'
import trend8 from './trend8.avif'
import './Shop.css'
import dis1 from './dis1.jpg'
import dis2 from './dis2.jpg'
import dis3 from './dis3.jpg'
import dis4 from './dis4.jpg'
import dis5 from './dis5.jpg'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SimpleImageSlider from "react-simple-image-slider";


const categories = [
  { id: 1, name: 'Women', imageUrl: women, subcategories: ['Tops', 'BottomWears', 'Coats', 'Dresses', 'Traditionals'] },
  { id: 2, name: 'Men', imageUrl: men, subcategories: ['Tshirts', 'BottomWears', 'Coats', 'Shirts', 'Traditionals'] },
  { id: 3, name: 'Kids', imageUrl: kids, subcategories: ['Tops', 'BootomWear', 'Coats', 'Traditionals', 'Dresses'] },
  { id: 4, name: 'Footwear', imageUrl: footwear, subcategories: ['Heels', 'Crocs', 'Slippers', 'Shoes','Boots'] },
  { id: 5, name: 'Accessories', imageUrl: accessories, subcategories: ['Rings', 'Bracelets', 'Bags', 'Necklaces', 'Earings'] },
];

function Shop() {

  const [marginLeft, setMarginLeft] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    { url: shoptop },
    { url: shoptop2 },
    { url: shoptop3 },
    { url: shoptop5 },
  ];



  const trendImages = [
    { image: trend1, title: "Women's Long Coat" },
    { image: trend2, title: "Men's Suit" },
    { image: trend3, title: "Gradient Shades" },
    { image: trend4, title: "Couple Rings" },
    { image: trend5, title: "Premium Wallet" },
    { image: trend6, title: "Combat Boots" },
    { image: trend7, title: "Jhumkas" },
    { image: trend8, title: "Leather Bracelets" },
    { image: trend2, title: "Men's Blazer" }
    // Add more trend objects as needed
  ];


  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % trendImages.length);
  };

  return (
    <>
      <div className="shop-container">
        <h1 style={{ position: 'absolute', background: 'rgba(0,0,0,0.1)', color: 'white', fontSize: '3rem', zIndex: 5, top: 200, left: 410, textAlign: 'center' }}>20% OFF ON LATEST ARRIVALS !!</h1>
        <div>
          <SimpleImageSlider
            width={1519}
            height={390}
            images={images}
            showBullets={true}
            showNavs={true}
            autoPlay={true}
          />
        </div>

        <div style={{ padding: '20px' , width:'98'}}>
          <h2 style={{textAlign:'center'}}>Shop By Category</h2>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {/* Map through categories and render cards */}
            {categories.map((category) => (
              <Card
                key={category.id}
                sx={{ width: 270, marginBottom: 3 }}
              >
                <CardActionArea component={Link} to={`/subcategory/${category.id}`}> {/* Pass category ID as a parameter */}
                {console.log(category.id)}
                  <CardMedia
                    component="img"
                    height="180"
                    boxshadow='rgba(0,0,0,0.5)'
                    image={category.imageUrl}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </div>


      </div >
      <Footer />
    </>
  )
}

export default Shop
