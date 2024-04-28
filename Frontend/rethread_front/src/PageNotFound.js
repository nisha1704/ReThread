import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import pnf from './pnf.avif';

function PageNotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <img src={pnf} alt="404 Not Found" style={{ maxWidth: '100%' }} />
      <h1>Oops! Page Not Found</h1>
      <p>The page you are looking for might be under construction or does not exist.</p>
      <Link to="/home">
        <button style={{
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#4d3d18',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none', // Remove the default link underline
          display: 'inline-block',
          marginTop: '20px',
          cursor: 'pointer',
        }}>
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default PageNotFound;

