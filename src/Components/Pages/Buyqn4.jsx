import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q4.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Buyqn4 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question4);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sr = ScrollReveal({
      distance: '60px',
      duration: 2500,
      delay: 400
    });

    sr.reveal('.logo2', { origin: 'top', delay: 200 });
    sr.reveal('.supqn1-image', { origin: 'left', delay: 600, distance: '100px' });
    sr.reveal('.supqn1-nav', { origin: 'bottom', delay: 800, distance: '20px' });
    sr.reveal('.supqn1-question h2', { origin: 'right', delay: 1000, distance: '80px' });
    sr.reveal('.supqn1-button', { origin: 'right', interval: 200, delay: 1200, distance: '50px' });

    return () => sr.destroy();
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      // Update context and navigate immediately
      await updateAnswer(4, option);
      navigate('/buyqn5');

      // Submit to Google Sheets in the background
      const url = "https://script.google.com/macros/s/AKfycbyL_h7LSONlLuH-Z1TY2ClE9rfvd5AzOgi7zHT3FNckZ2kN_sSWMhLeftGTbI0gWlku/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer4=${encodeURIComponent(option)}`
      })
        .then(response => response.text())
        .catch(error => console.error('Submission error:', error));
    } catch (error) {
      console.error('Error updating answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img className="logo2" src={mainLogo} alt="Groundcentered Logo" />
      <div className="supqn1-container">
        <div className="supqn1-card">
          <div className="supqn1-content">
            <div className="supqn1-img">
              <img src={qn1} alt="Drilling Equipment" className="supqn1-image" />
              <Link to='/buyqn3'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>4. What features would make an online marketplace <br /> more useful for you?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Product reviews and ratings' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Product reviews and ratings')}
                disabled={isLoading}
              >
                Product reviews and ratings
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Competitive pricing' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Competitive pricing')}
                disabled={isLoading}
              >
                Competitive pricing
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Both' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Both')}
                disabled={isLoading}
              >
                Both
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="supqn1-footer">
        <div className="supqn1-progress">
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
        </div>
      </div>
    </div>
  );
};