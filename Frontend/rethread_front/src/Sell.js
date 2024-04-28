import React from 'react'
import Navbar from './Navbar'
import maintop from "./maintop.png";
import s1 from './s1.png'
import s2 from './s2.png'
import s3 from './s3.png'
import s4 from './s4.png'
import s5 from './s5.png'
import arrow from './arrow.png'
import { Button } from '@mui/material';
import './Sell.css'
import { Link } from "react-router-dom"
import Footer from './Footer'

function Sell() {
  return (
    <>
      <div>
        <img src={maintop} alt="Description of Image" style={{ width: '100%', height: '310px' }} />
        <h1 style={{
          position: 'absolute',
          top: '21%',
          left: '38%',
          color: "white",
          fontSize: 60,
          fontWeight: 'bolder',
          fontFamily: 'Roboto'
        }}>
          Selling Process
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', marginTop: 15, justifyContent: 'center' }}>
            <img className="zoom-image" src={s1} alt="Image 1" style={{ width: '11%', height: 210, transition: 'transform 0.3s', cursor: 'pointer' }} />
            <img src={arrow} alt="arrow 1" style={{ width: '8%', height: 150, marginLeft: 10 }} />
            <img className="zoom-image" src={s2} alt="Image 2" style={{ width: '11%', height: 210, marginLeft: 10, transition: 'transform 0.3s', cursor: 'pointer' }} />
            <img src={arrow} alt="arrow 2" style={{ width: '8%', height: 150, marginLeft: 10 }} />
            <img className="zoom-image" src={s3} alt="Image 3" style={{ width: '11%', height: 210, marginLeft: 10, transition: 'transform 0.3s', cursor: 'pointer' }} />
            <img src={arrow} alt="arrow 3" style={{ width: '8%', height: 150, marginLeft: 10 }} />
            <img className="zoom-image" src={s4} alt="Image 4" style={{ width: '11%', height: 210, marginLeft: 10, transition: 'transform 0.3s', cursor: 'pointer' }} />
            <img src={arrow} alt="arrow 4" style={{ width: '8%', height: 150, marginLeft: 10 }} />
            <img className="zoom-image" src={s5} alt="Image 5" style={{ width: '11%', height: 210, marginLeft: 10, transition: 'transform 0.3s', cursor: 'pointer' }} />
          </div>

          <Link to="/selling-form" style={{ textDecoration: 'none', color: 'white' }}>
            <Button sx={{
              backgroundColor: '#4d3d18',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3b2e12',
                justifyContent: 'center'
              },
              padding: '10px 20px',
              borderRadius: '5px',
              width: '110%',
              marginTop: 3,
              marginBottom: 3,
              fontSize: '16px',
              fontWeight: 'bold',
            }}>Get Started
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Sell