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

        <Box className="trending-slider-container" sx={{ width: 1480, marginTop: 5, boxShadow: 8, marginLeft: 'auto', marginBottom: 3, marginRight: 'auto', display: 'flex', overflowX: 'hidden', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Shop By Trending</h2>
          <IconButton className={'trending-slider-btn trending-slider-btn-left'} sx={{ backgroundColor: 'black', color: 'white', left: '-700px', top: '200px' }} onClick={handlePrevSlide}>
            <KeyboardArrowLeftIcon />
          </IconButton>

          <div className="trending-slider-container">
            {trendImages.slice(currentSlide, currentSlide + 5).map((trend, index) => (
              <Card
                key={index}
                className='animate_from_bottom'
                sx={{ width: 270, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}
              >
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia component="img" height="180" image={trend.image} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {trend.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>

          <IconButton className={'trending-slider-btn trending-slider-btn-right'} sx={{ backgroundColor: 'black', color: 'white', right: '-710px', top: '-150px' }} onClick={handleNextSlide} disabled={marginLeft >= trendImages.length - 5}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>

        <Box className="discount-container" sx={{ width: 1480, marginTop: 5, boxShadow: 8, marginLeft: 'auto', marginBottom: 3, marginRight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Products On Discount</h2>
          <div className="card-container">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card className='animate_from_bottom' sx={{ width: 270, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}>
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia
                    component="img"
                    height="180"
                    image={dis1}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Men's Cotton Shirts
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className='animate_from_bottom' sx={{ width: 270, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}>
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia
                    component="img"
                    height="180"
                    image={dis2}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Women's Tops
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className='animate_from_bottom' sx={{ width: 270, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}>
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia
                    component="img"
                    height="180"
                    image={dis3}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Bagacks
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className='animate_from_bottom' sx={{ width: 270, marginTop: 3, marginLeft: 3, marginBottom: 3, boxShadow: 5 }}>
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia
                    component="img"
                    height="180"
                    image={dis4}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Jeans
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

              <Card className='animate_from_bottom' sx={{ width: 270, marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3, boxShadow: 5 }}>
                <CardActionArea component={Link} to="/subcategory">
                  <CardMedia
                    component="img"
                    height="180"
                    image={dis5}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Sneakers
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </Box >
      </div >
      <Footer />
    </>
  )
}

export default Shop
