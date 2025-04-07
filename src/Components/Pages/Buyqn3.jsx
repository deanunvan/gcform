import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q3.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Buyqn3 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question3);
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
      await updateAnswer(3, option);
      navigate('/buyqn4');

      // Submit to Google Sheets in the background
      const url = "https://script.google.com/macros/s/AKfycbwU5KHlTZIf5GLcC6YhgF6je89i_W-hxvZmfMKolYLons2tIUcm_Ho51maQ6SW-fBex1A/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer3=${encodeURIComponent(option)}`
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
              <Link to='/buyqn2'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>3. What type of equipment do you frequently source?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Heavy Equipment' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Heavy Equipment')}
                disabled={isLoading}
              >
                Heavy Equipment
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Light Equipment' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Light Equipment')}
                disabled={isLoading}
              >
                Light Equipment
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
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
        </div>
      </div>
    </div>
  );
};