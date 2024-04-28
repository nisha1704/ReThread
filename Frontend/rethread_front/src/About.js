import React from 'react';
import Navbar from './Navbar';
import maintop from "./maintop.png";
import perople from "./p1.png";
import './About.css'; // Import the CSS file
import Footer from './Footer';

function About() {
  return (
    <>
      <div>
        <img src={maintop} alt="Description of Image" className="main-image" />
        <h1 className="about-heading">
          About Us
        </h1>
        <div className="content-container">
          <img className="slide-in-image" src={perople} alt="Description of Image" />
          <div className="text-content">
            <h2>Welcome to our platform</h2>
            <p>
              A place where we firmly believe in the power of second chances! Our mission is to create a sustainable fashion ecosystem that benefits everyone involved.<br /><br />

              Our platform serves as a bridge between individuals who are looking to de-clutter their wardrobes and those who are in search of affordable clothing options. We understand that affordability should not compromise quality. Therefore, we have a stringent verification process in place. Each item listed on our platform undergoes this process to ensure it meets our high-quality standards.<br /><br />

              But our platform is more than just a marketplace. It’s a community of fashion-conscious individuals who understand the value of each garment and believe in extending its lifecycle. By choosing to purchase pre-loved items, our customers contribute to reducing fashion waste and promoting sustainability.<br /><br />

              So, join us in our journey to transform wardrobes across the world. Together, we can make a difference. Together, we can give fashion a second chance.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

