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
      delay: 200,
    });

    sr.reveal('.thank-you-content h1', { origin: 'bottom', delay: 600, distance: '50px' });
    sr.reveal('.thank-you-content p', { origin: 'bottom', delay: 800, distance: '30px' });
    sr.reveal('.thank-you-image', { origin: 'bottom', delay: 200, distance: '20px' });

    // Redirect to homepage after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      sr.destroy();
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div>
      <div className="thank-you-page">
        <img className="logo2" src={Logo2} alt="Groundcentered Logo" />
        <div className="thank-you-content">
          <h1>Thank You!</h1>
          <img src={qn1} alt="Drilling Equipment" className="thank-you-image" />
          <p>You have successfully joined our waiting list. We will keep you posted.</p>
        </div>
      </div>
      <footer className="footer">
        <p>groundcentered.com © 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};
