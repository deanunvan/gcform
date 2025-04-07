import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q2.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Buyqn2 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sr = ScrollReveal({
      distance: '60px',
      duration: 600,
      delay: 200
    });
    
    sr.reveal('.supqn1-image', { origin: 'left', delay: 400, distance: '100px' });
    sr.reveal('.supqn1-nav', { origin: 'bottom', delay: 600, distance: '20px' });
    sr.reveal('.supqn1-question h2', { origin: 'right', delay: 800, distance: '80px' });
    sr.reveal('.supqn1-button', { origin: 'right', interval: 100, delay: 1000, distance: '50px' });
    sr.reveal('.supqn1-input-group', { origin: 'bottom', delay: 1200, distance: '30px' });
    
    return () => sr.destroy();
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      // Update context and navigate immediately
      await updateAnswer(2, option);
      navigate('/buyqn3');

      // Submit to Google Sheets in the background
      const url = "https://script.google.com/macros/s/AKfycbyL_h7LSONlLuH-Z1TY2ClE9rfvd5AzOgi7zHT3FNckZ2kN_sSWMhLeftGTbI0gWlku/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer2=${encodeURIComponent(option)}`
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
              <Link to='/buyqn1'>
                <button className="supqn1-nav">←</button>
              </Link>
            </div>
            <div className="supqn1-question">
              <h2>2. How do you currently source equipment?</h2>
              <button 
                type="button"
                className={`supqn1-button ${selectedOption === 'Online marketplace' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Online marketplace')}
                disabled={isLoading}
              >
                Online marketplace
              </button>
              <button 
                type="button"
                className={`supqn1-button ${selectedOption === 'Directly from manufacturers' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Directly from manufacturers')}
                disabled={isLoading}
              >
                Directly from manufacturers
              </button>
              <button 
                type="button"
                className={`supqn1-button ${selectedOption === 'In-person purchases' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('In-person purchases')}
                disabled={isLoading}
              >
                In-person purchases
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="supqn1-footer">
        <div className="supqn1-progress">
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
        </div>
      </div>
    </div>
  );
};