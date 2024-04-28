import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './App';

function Profile() {
    const {user} = useContext(AppContext);
    const [profilePic, setProfilePic] = useState('');
    const [userName, setUserName] = useState(user.user_name);
    const [userEmail, setUserEmail] = useState(user.email);
    const [userPassword, setUserPassword] = useState(user.password);
    const [userAddress, setUserAddress] = useState(user.address);
    const [showPassword, setShowPassword] = useState(false);

    const notify = () => toast.success("Profile Updated Successfully!");

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePic(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const updateUserDetails = () => {
        // Simulating an API call to update user details
        console.log('Updating user details...');
        console.log('Updated User Name:', userName);
        console.log('Updated User Email:', userEmail);
        console.log('Updated User Password:', userPassword);
        console.log('Updated User Address:', userAddress);

        // You can replace the following with your actual API call
        // axios.post('/api/update-user', { userName, userEmail, userPassword, userAddress })
        //   .then(response => {
        //     console.log('User details updated successfully:', response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error updating user details:', error);
        //   });
    };

    const boxStyle = {
        maxWidth: 500,
        backgroundColor: 'white',
        margin: 'auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        marginTop: '30px',
        marginBottom: '20px',
    };
    if (user.email===""){
        return <Box style={boxStyle}>
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>User not Logged in!!</Paper>
        </Box>;
    }
    return (
        <>
            <Box style={boxStyle}>
                <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                    <label htmlFor="profile-pic-input">
                        <Avatar src={profilePic} sx={{ width: 100, height: 100, margin: 'auto', cursor: 'pointer' }}>
                            {!profilePic && <EditIcon />}
                        </Avatar>
                    </label>
                    <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: 'none' }} id="profile-pic-input" />
                    <TextField
                        label="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                    />
                    <TextField
                        label="User Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                    />
                    <TextField
                        label="User Password"
                        type={showPassword ? 'text' : 'password'}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleTogglePasswordVisibility} color="primary">
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="User Address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        fullWidth
                        sx={{ marginTop: '20px' }}
                    />
                    <Button
                        sx={{
                            backgroundColor: '#4d3d18',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#3b2e12',
                            },
                            padding: '10px 20px',
                            borderRadius: '5px',
                            marginTop: '20px',
                            marginBottom: '7px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            alignItems: 'center',
                            width: '55%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            display: 'block',
                        }}
                        onClick={() => {
                            updateUserDetails();
                            notify();
                        }}
                    >
                        Save Changes
                    </Button>
                    <ToastContainer/>
                </Paper>
            </Box>
            <Footer />
        </>
    );
}

export default Profile;
