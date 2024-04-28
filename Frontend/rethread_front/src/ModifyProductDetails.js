import React, { useState, useEffect } from 'react';
import { TextField, Typography, IconButton, Grid, Box, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import Footer from './Footer';
import productavatar from './useravatar.png';
import axios, { isCancel, AxiosError } from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ReactPaginate from 'react-paginate';
import './Paginate.css'

const domain  = process.env.REACT_APP_DOMAIN

const ModifyProductDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;


  useEffect(() => {
    axios.get(`${domain}/all-products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleSearch = () => {
    const results = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
    console.log(searchQuery)
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handleDelete = (productId) => {
    // Send DELETE request to delete the user
    axios.delete(`${domain}/delete-product/${productId}`)
      .then((response) => {
        // Filter out the deleted user from the state
        const updatedProducts = filteredProducts.filter((product) => product.id !== productId);
        setFilteredProducts(updatedProducts);
        console.log("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting Product:", error);
      });
    window.alert("Product deleted successfully"); // Display alert
  };

  const handleSave = (productId) => {
    if (editingProduct && editingProduct._id === productId) {
      axios.patch(`${domain}0/product-details-update/${productId}`, editingProduct)
        .then(() => {
          setProducts(products.map(product => product._id === productId ? editingProduct : product));
          setEditingProduct(null);
          console.log("Product updated successfully");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  const [editingProduct, setEditingProduct] = useState(null);

  // Update handleInputChange to modify editingProduct instead of products
  const handleInputChange = (e, productId) => {
    if (editingProduct._id === productId) {
      const { name, value } = e.target;
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };



  return (
    <>
      <Container component="main" maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          View Product Details
        </Typography>
        <TextField
          type="text"
          placeholder="Search product by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search Product"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '20px' }}
        />

        {filteredProducts.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No products found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((product) => (
              <Grid item xs={12} key={product.id}>
                <Box
                  style={{
                    border: '1px solid #ddd',
                    padding: '20px',
                    marginBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={product.img || productavatar}
                    alt={`Profile of ${product.product_name}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      marginBottom: '10px',
                      border: '2px solid #ccc',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {!product.img && 'P'}
                  </Avatar>
                  <div>
                    <IconButton onClick={() => handleDelete(product.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="success" onClick={() => handleSave(product._id)}>
                      <SaveIcon />
                    </IconButton>
                  </div>
                  <TextField
                    name="product_name"
                    label="Title"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.product_name : product.product_name}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.description : product.description}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    multiline
                    rows={3}
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="category"
                    label="Category"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.category : product.category}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="sub_cat"
                    label="Subcategory"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.sub_cat : product.sub_cat}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="brand"
                    label="Brand"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.brand : product.brand}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="size"
                    label="Size"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.size : product.size}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="color"
                    label="Color"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.color : product.color}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="material"
                    label="Material"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.material : product.material}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="mrp"
                    label="MRP"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.mrp : product.mrp}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="price"
                    label="Price"
                    onClick={() => setEditingProduct(product)}
                    value={editingProduct && editingProduct._id === product._id ? editingProduct.price : product.price}
                    onChange={(e) => handleInputChange(e, product._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />

                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container >
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <Footer />
    </>
  );
};

export default ModifyProductDetails;

