import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Logo2 from '../Images/main logo.png';
import qn1 from '../Images/tik.png';
import './Pages.css';

export const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sr = ScrollReveal({
      distance: '60px',
      duration: 800,
      delay: 200
    });

    // Logo animation
    sr.reveal('.logo2', {
      origin: 'top',
      delay: 200
    });

    // Content animations
    sr.reveal('.thank-you-content h1', {
      origin: 'bottom',
      delay: 600,
      distance: '50px'
    });

    sr.reveal('.thank-you-content p', {
      origin: 'bottom',
      delay: 800,
      distance: '30px'
    });

    sr.reveal('.home-button', {
      origin: 'bottom',
      delay: 900,
      distance: '20px'
    });

    sr.reveal('.thank-you-image', {
      origin: 'bottom',
      delay: 200,
      distance: '20px'
    });

    return () => sr.destroy();
  }, []);

  const handleReload = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <div className="thank-you-page">
      <img className="logo2" src={Logo2} alt="Groundcentered Logo" />
      <div className="thank-you-content">
        <h1>Thank You!</h1>
        <img src={qn1} alt="Drilling Equipment" className="thank-you-image" />
        <p>You have successfully joined our waiting list. We will keep you posted.</p>
        <button onClick={handleReload} className="home-button">
          Done!
        </button>
      </div>
    </div>
    <footer className="footer">
        <p>groundcentered.com © 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};
