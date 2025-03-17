import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../Images/main logo.png';
import heroImage from '../Images/one.png';
import './Pages.css';

export const Home = () => {
  return (
    <div className="home-container">
      {/* Header / Logo */}
      <header className="header">
        <img className="logo" src={mainLogo} alt="Groundcentered Logo" />
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Background Image */}
        <div className="hero-image">
          <img src={heroImage} alt="Heavy Equipment Loader" />
        </div>

        {/* Text Content */}
        <div className="hero-text fade-in">
          <h1>
              <strong>Connecting Buyers and Suppliers <br />
              of Heavy Equipment <br /> with Ease</strong>
          </h1>
          <p className="subheading">
            Save Time, Access Trusted Suppliers and Buyers. Enjoy <br /> 
            Exclusive Discounts. All In One Platform.
          </p>
          <div className="orange-line-div">
            <div className="orange-line"></div>
            <div>
              <h2>Join Our Waiting List</h2>
              <p className="small-text">Fill Our Form Below</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <Link to="/supform" className="cta-btn supplier">I Am A Supplier</Link>
            <Link to="/buyform" className="cta-btn buyer">I Am A Buyer</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>groundcentered.com © 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};
