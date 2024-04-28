import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Home.css'; // Import the CSS file

function Home() {
  return (
    <>
      <div className="home-container">
        <div>
          <h1 className='animate_zoomIn'>ReThread</h1>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;

