import { Cloudinary } from "@cloudinary/url-gen";
import { UploadApi } from "@cloudinary/url-gen/api/upload";
import axios from "axios"; // If you're using axios for HTTP requests

const cloud = new Cloudinary({ cloud: { cloudName: 'de7ydamd2' } });
const uploadApi = new UploadApi(cloud);

// Function to upload image and store URL in database
const uploadImage = async (file) => {
  try {
    // Upload image to Cloudinary
    const result = await uploadApi.upload('./admin.png');

    // Get image URL
    const imageUrl = result.url;

    // Store image URL in database
    const response = await axios.post('http://localhost:8000/api/images', { imageUrl });

    console.log('Image uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
