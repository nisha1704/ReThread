import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import Footer from './Footer';
import { Link } from 'react-router-dom';

import womentops from './Tops.jpg';
import childrentops from './CTops.webp';
import womenbottomwear from './WBottomWears.avif';
import menbottomwear from './MBottomWears.webp';
import childrenbottomwear from './CBottomWears.jpg';
import womencoats from './WCoats.jpg';
import mencoats from './MCoats.png';
import childrencoats from './CCoats.webp';
import womendresses from './Dresses.jpeg';
import childrendresses from './CDresses.webp';
import womentraditionals from './WTraditionals.jpg';
import mentraditionals from './MTraditionals.jpg';
import childrentraditionals from './CTraditionals.webp';
import mentshirts from './Tshirts.jpg';
import menshirts from './Shirts.avif';
import allheels from './Heels.webp';
import allcrocs from './Crocs.jpg';
import allslippers from './Slippers.jpg';
import allshoes from './Shoes.avif';
import allboots from './Boots.jpg';
import allrings from './Rings.jpg';
import allbracelets from './Bracelets.webp';
import allbags from './Bags.webp';
import allnecklaces from './Necklaces.avif';
import allearings from './Earings.jpg';


// Sample data for subcategories (replace with your actual data)
const subcategories = {
  1: ['womentops', 'womenbottomwear', 'womencoats', 'womendresses', 'womentraditionals'],
  2: ['mentshirts', 'menbottomwear', 'mencoats', 'menshirts', 'mentraditionals'],
  3: ['childrentops', 'childrenbottomwear', 'childrencoats', 'childrentraditionals', 'childrendresses'],
  4: ['allheels', 'allcrocs', 'allslippers', 'allshoes', 'allboots'],
  5: ['allrings', 'allbracelets', 'allbags', 'allnecklaces', 'allearings'],
};


const subcategoryImages = {
  womentops: womentops,
  childrentops: childrentops,
  womenbottomwear: womenbottomwear,
  menbottomwear: menbottomwear,
  childrenbottomwear: childrenbottomwear,
  womencoats: womencoats,
  mencoats: mencoats,
  childrencoats: childrencoats,
  womendresses: womendresses,
  childrendresses: childrendresses,
  womentraditionals: womentraditionals,
  mentraditionals: mentraditionals,
  childrentraditionals: childrentraditionals,
  mentshirts: mentshirts,
  menshirts: menshirts,
  allheels: allheels,
  allcrocs: allcrocs,
  allslippers: allslippers,
  allshoes: allshoes,
  allboots: allboots,
  allrings: allrings,
  allbracelets: allbracelets,
  allbags: allbags,
  allnecklaces: allnecklaces,
  allearings: allearings,
};

function capitalizeEachWord(str) {
  const wordsToRemove = ['women', 'men', 'children', 'all'];

  const regex = new RegExp(wordsToRemove.join("|"), "gi");
  let separatedWords = str.replace(regex, (matchedWord) => matchedWord + ' ');
  separatedWords = separatedWords.replace(/\b\w/g, (char) => char.toUpperCase());
  console.log(separatedWords);
  return separatedWords;
}



function Subcategory() {

  const { id } = useParams();
  console.log("id"); // Check if categoryId is correctly retrieved

  // Get the subcategories for the selected category ID
  const categorySubcategories = subcategories[id];
  console.log("categorySubcategories:", categorySubcategories); // Log categorySubcategories to inspect

  return (
    <>
      <div style={{ padding: '20px', marginLeft: '100px' }}>
        <h1>Choose Your Style</h1>
        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '94%',
            justifyContent: 'space-around',
          }}
        >
          {/* Map through subcategories of the selected category and render cards */}
          {console.log(true)}
          {categorySubcategories &&
            categorySubcategories.map((subcategory, index) => (
              <Card key={index} sx={{ width: 300, marginBottom: 3 }}>
                <Link
                  to={`/products/${id}/${subcategory}`} // Assuming "/products/:categoryId/:subcategory" is your products page route
                  style={{ textDecoration: 'none', color: 'inherit' }} // Optional styling
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={subcategoryImages[subcategory]}
                      alt={subcategory}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {capitalizeEachWord(subcategory)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            ))}
        </Box>
      </div >
      <Footer />
    </>
  );
}

export default Subcategory;
