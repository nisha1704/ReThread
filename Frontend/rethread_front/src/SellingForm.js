import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Textarea from '@mui/joy/Textarea';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import axios from 'axios'; // Import axios
import gliterback from "./gliterback.jpg"
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const domain  = process.env.REACT_APP_DOMAIN

function convertToBase6(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

function SellingForm() {

  const [user_name, setName] = useState('');
  const [product_name, setProduct] = useState('');
  const [resell_price, setResellPrice] = useState(0);
  const [buyerPays, setBuyerPays] = useState(0);
  const [youGet, setYouGet] = useState(0);
  const [description, setDescription] = useState(''); // State variable for description
  const [material, setMaterial] = useState(''); // State variable for material
  const [brand, setBrand] = useState(''); // State variable for brand
  const [size, setSize] = useState(''); // State variable for size
  const [color, setColor] = useState(''); // State variable for color
  const [condition, setCondition] = useState(''); // State variable for condition
  const [reason, setReasonForReselling] = useState(''); // State variable for reasonForReselling
  const [shipping_method, setShippingMethod] = useState(''); // State variable for shippingMethod
  const [mrp, setMRP] = useState(''); // State variable for MRP

  const handleResellingPriceChange = (event) => {
    const price = parseFloat(event.target.value);
    setResellPrice(price);
    setBuyerPays(price);
    setYouGet(Math.round(0.7 * price));
  };
  const notify = () => toast.done("Wow so easy!");

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleFrontChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase6(file);
    setFront(base64);
  };

  const handleBackChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertToBase6(file);
    setBack(base64);
  };

  const handleMRPChange = (event) => {
    const value = parseInt(event.target.value);
    setMRP(isNaN(value) ? 0 : value);
  };


  const handleSubmit = () => {
    // Construct data object with form values
    console.log(front);
    console.log(back);
    const formData = {
      user_name,
      product_name,
      description,
      material,
      brand,
      size,
      color,
      condition,
      reason,
      shipping_method,
      mrp,
      resell_price,
      img_front: front,
      img_back: back,
    };
    console.log('Form Data:', formData);

    axios.post(`http://localhost:10000/upload`, formData)
    .then(response => {
      console.log('Form submitted successfully:', response.data);
      toast.success("Submitted Successfully!");
    })
    .catch(error => {
      // Handle error response, e.g., display error message
      console.error('Error submitting form:', error);
      toast.error("Form Not Submitted");
      toast.error("Input Complete Details");
    });
  }



  return (
    <>
      <div style={{
        backgroundImage: `url(${gliterback})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        height: '870px',
        width: '100%',
        paddingTop: '1px',  // Adjust the top padding to create space at the top
      }}>
        <h1 style={{ textAlign: 'center', paddingTop: '25px' }}>Product Selling Form</h1>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 960,
          backgroundColor: 'white',
          marginTop: 5,  // Adjust the margin-top to move the box down
          boxShadow: 8,
          marginLeft: 'auto',
          marginRight: 'auto',

        }}>
          <div style={{width:'40%', alignItems:'center', alignContent:'center'}}>
            <TextField id="outlined-basic" label="Your Name" variant="outlined" sx={{ width: 300, marginTop: 2 }} onChange={(event) => setName(event.target.value)} />
            <TextField id="outlined-basic" label="Product Name" variant="outlined" sx={{ width: 300, marginTop: 2 }} onChange={(event) => setProduct(event.target.value)} />

            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categories}
              sx={{ width: 300, marginTop: 3 }}
              renderInput={(params) => <TextField {...params} label="Category" />}
              onChange={(event, newValue) => setCategory(newValue)}
            />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={subcategories}
              sx={{ width: 300, marginTop: 3 }}
              renderInput={(params) => <TextField {...params} label="SubCategory" />}
              onChange={(event, newValue) => setSubcategory(newValue)}
            /> */}
            <Textarea name="Outlined" placeholder="Desciption of Product" variant="outlined" minRows={3} sx={{ width: 300, marginTop: 2 }} onChange={(event) => setDescription(event.target.value)} />

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={materials}
              sx={{ width: 300, marginTop: 2 }}
              renderInput={(params) => <TextField {...params} label="Material" />}
              onChange={(event, newValue) => setMaterial(newValue)}
            />

            <TextField id="outlined-basic" label="Brand" variant="outlined" sx={{ width: 300, marginTop: 2 }} onChange={(event) => setBrand(event.target.value)}  />
            <div style={{ display: 'flex', flexDirection:'row',justifyContent: 'center' ,width:'78%' }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={sizes}
                sx={{ width: '50%', marginTop: 2 }} // Adjusted width for Size
                renderInput={(params) => <TextField {...params} label="Size" />}
                onChange={(event, newValue) => setSize(newValue)}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={colors}
                sx={{ width: '50%', marginTop: 2 }} // Adjusted width for Color
                renderInput={(params) => <TextField {...params} label="Color" />}
                onChange={(event, newValue) => setColor(newValue)}
              />
            </div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={conditions}
              sx={{ width: 300, marginTop: 2 }}
              renderInput={(params) => <TextField {...params} label="Condition" />}
              onChange={(event, newValue) => setCondition(newValue)}
            />

            <Textarea name="Outlined" placeholder="Reason for Re-Selling" variant="outlined" minRows={3} sx={{ width: 300, marginTop: 2, marginBottom: 3 }} onChange={(event) => setReasonForReselling(event.target.value)} />
          </div>
          <div div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: 5 }}>
                <Box sx={{ width: '188px', height: 120, marginTop: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input type="file" id="front" name="front" accept="image/*" style={{ display: 'none' }} onChange={handleFrontChange} />
                  <label htmlFor="front">
                    {front ? <Avatar src={front} alt="front" style={{ width: 70, height: 70, marginTop: 5 }} /> : <Avatar alt="Front" style={{ width: 70, height: 70, marginTop: 5 }}>1</Avatar>}
                  </label>
                  <p>Front Image</p>
                </Box>
                <Box sx={{ width: '188px', height: 120, marginTop: 2, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <input type="file" id="back" name="back" accept="image/*" style={{ display: 'none' }} onChange={handleBackChange} />
                  <label htmlFor="back">
                    {back ? <Avatar src={back} alt="Image 2" style={{ width: 70, height: 70, marginTop: 5 }} /> : <Avatar alt="Back" style={{ width: 70, height: 70, marginTop: 5 }}>2</Avatar>}
                  </label>
                  <p>Back Image</p>
                </Box>
              </div>
            </div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={shippingMethods}
              sx={{ width: 300, marginTop: 2 }}
              renderInput={(params) => <TextField {...params} label="Shipping Method" />}
              onChange={(event, newValue) => setShippingMethod(newValue)}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField id="outlined-basic" label="MRP" variant="outlined" sx={{ width: '48%', marginTop: 2 }} onChange={handleMRPChange} />
              <TextField id="outlined-basic" label="Reselling Price" variant="outlined" sx={{ width: '48%', marginTop: 2 }} onChange={handleResellingPriceChange} />
            </div>

            <Box sx={{ width: '100%', marginTop: 2, padding: 2, border: '1px solid #ccc', borderRadius: 5 }}>
              <Typography variant="h6" gutterBottom>
                Price Breakdown
              </Typography>
              <div style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                    Buyer Pays (Rs)
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                    You Get (Rs)
                  </Typography>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 30 }}>
                    {buyerPays}
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontSize: 30 }}>
                    {youGet}
                  </Typography>
                </div>
              </div>
              <div style={{ display: 'flex', alignContent: 'center', textAlign: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                    Resale Price
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                    Resale Price - ReThread Commission
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
        </Box >

        <Button sx={{
          backgroundColor: '#4d3d18',
          color: 'white',
          '&:hover': {
            backgroundColor: '#3b2e12',
          },
          padding: '10px 20px',
          borderRadius: '5px',
          marginTop: '20px',
          marginBottom: '40px',
          fontSize: '16px',
          fontWeight: 'bold',
          alignItems: 'center',
          width: '25%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'block',
        }} onClick={() => {
          handleSubmit();
          notify();
        }}> 
          Submit Form
        </Button>
        <ToastContainer/>
      </div >
      <Footer />
    </>
  )
}

// const subcategories = [
//   'Tops' ,
//   'BottomWear',
//     'Coats',
//     'Traditionals',
//     'Dresses',
//     'Shirts',
//     'FlipFlops',
//     'Boots',
//     'Heels',
//     'Sandles',
//     'Shoes',
//     'Crocs',
//     'Bagpacks',
//     'Purses',
//     'Wallet',
//     'Bracelets',
//     'Rings',
//   'Earings',
//   'Bangles',
//   'Nacklaces' ,

//   // Add more categories as needed
// ];


const materials = [
    'Cotton',
    'Polyester',
    'Leather',
    'Denim',
    'Wool',
    'Silk',
    'Linen',
    'Spandex',
    'Rayon',
    'Nylon',
    'Velvet',
    'Fur',
    'Satin',
    'Chiffon',
    'Canvas',
    'Rubber',
    'Synthetic',
    'Acrylic',
    'Jersey',
  // Add more materials as needed
];


const sizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
];

const colors = [
    'Red',
    'Blue',
    'Green',
    'Black',
    'White',
    'Yellow',
    'Pink',
    'Purple',
    'Orange',
    'Brown',
    'Gray',
    'Beige',
    'Navy',
    'Teal',
    'Turquoise',
    'Magenta',
    'Maroon',
    'Lavender',
    'Olive',
    'Coral',
    'Indigo',
    'Violet',
];


const conditions = [
    'New with tags',
    'New without tags',
    'Like new',
    'Gently used',
    'Well used',
];
const categories = [
    'Men',
    'Women',
    'Kids',
    'Footwear',
    'Accessories',
];

const shippingMethods = [
    'Standard Shipping',
    'Express Shipping',
    'Free Shipping',
];

export { materials, sizes, colors, conditions, shippingMethods };


export default SellingForm
