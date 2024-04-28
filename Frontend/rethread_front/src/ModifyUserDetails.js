import React, { useEffect, useState } from 'react';
import { TextField, Typography, Avatar, IconButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import useravatar from './useravatar.png';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import Footer from './Footer';
import axios from 'axios'; // Import axios
import ReactPaginate from 'react-paginate';
import './Paginate.css'

const domain  = process.env.REACT_APP_DOMAIN
console.log(domain)

const ModifyUserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 2;


  useEffect(() => {
    axios.get(`${domain}/all-users`)
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers with all users

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    const results = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (userId) => {
    // Send DELETE request to delete the user
    axios.delete(`${domain}/delete-user/${userId}`)
      .then((response) => {
        // Filter out the deleted user from the state
        const updatedUsers = filteredUsers.filter((user) => user.id !== userId);
        setFilteredUsers(updatedUsers);
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
    window.alert("User deleted successfully"); // Display alert
  };

  const handleSave = (userId) => {
    if (editingUser && editingUser._id === userId) {
      axios.patch(`${domain}/user-details-update/${userId}`, editingUser)
        .then(() => {
          setUsers(users.map(user => user._id === userId ? editingUser : user));
          setEditingUser(null);
          console.log("User updated successfully");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };


  const [editingUser, setEditingUser] = useState(null);

 // Update handleInputChange to modify editingUser instead of users
  const handleInputChange = (e, userId) => {
    if (editingUser._id === userId) {
      const { name, value } = e.target;
      setEditingUser({ ...editingUser, [name]: value });
    }
  };


  const renderArrayItems = (array) => {
    return array.join('\n');
  };

  return (
    <>
      <Container component="main" maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h4" gutterBottom>
          View User Details
        </Typography>
        <TextField
          type="text"
          placeholder="Search user by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          label="Search User"
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

        {filteredUsers.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No users found.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((user) => (
              <Grid item xs={12} key={user._id}>
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
                    src={user.profilePic || useravatar}
                    alt={`Profile of ${user.name}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      marginBottom: '10px',
                      border: '2px solid #ccc',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {!user.profilePic && 'U'}
                  </Avatar>
                  <div style={{ display: 'flex', gap: '10px' }}> {/* Style for the icons container */}
                    <IconButton onClick={() => handleDelete(user._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="success" onClick={() => handleSave(user._id)}>
                      <SaveIcon />
                    </IconButton>
                  </div>
                  <TextField
                    name="user_name"
                    label="Name"
                    onClick={() => setEditingUser(user)}
                    value={editingUser && editingUser._id === user._id ? editingUser.user_name : user.user_name}
                    onChange={(e) => handleInputChange(e, user._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    onClick={() => setEditingUser(user)}
                    value={editingUser && editingUser._id === user._id ? editingUser.email : user.email}
                    onChange={(e) => handleInputChange(e, user._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="contact"
                    label="Contact"
                    onClick={() => setEditingUser(user)}
                    value={editingUser && editingUser._id === user._id ? editingUser.contact : user.contact}
                    onChange={(e) => handleInputChange(e, user._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="address"
                    label="Address"
                    onClick={() => setEditingUser(user)}
                    value={editingUser && editingUser._id === user._id ? editingUser.address : user.address}
                    onChange={(e) => handleInputChange(e, user._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="earning"
                    label="Earning"
                    onClick={() => setEditingUser(user)}
                    value={editingUser && editingUser._id === user._id ? editingUser.earning : user.earning}
                    onChange={(e) => handleInputChange(e, user._id)}
                    variant="outlined"
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    label="Cart"
                    onClick={() => setEditingUser(user)}
                    value={renderArrayItems(user.cart)}
                    variant="outlined"
                    multiline
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    label="Orders"
                    onClick={() => setEditingUser(user)}
                    value={renderArrayItems(user.orders)}
                    variant="outlined"
                    multiline
                    style={{ marginBottom: '10px' }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
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

export default ModifyUserDetails;

