import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q6.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Buyqn6 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer, submitToWaitingList } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question6);
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
      await updateAnswer(6, option);
      navigate('/buyqn7');

      // Submit to Google Sheets in the background
      const url = "https://script.google.com/macros/s/AKfycbwU5KHlTZIf5GLcC6YhgF6je89i_W-hxvZmfMKolYLons2tIUcm_Ho51maQ6SW-fBex1A/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer6=${encodeURIComponent(option)}`
      })
        .then(response => response.text())
        .catch(error => console.error('Sheets submission error:', error));

      // Submit to waiting list in the background
      submitToWaitingList()
        .catch(error => console.error('Waiting list submission error:', error));
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
              <Link to='/buyqn6'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>6. Would secure communication channels on the platform <br /> appeal to you?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Yes' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Yes')}
                disabled={isLoading}
              >
                Yes
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'No' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('No')}
                disabled={isLoading}
              >
                No
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Not important' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Not important')}
                disabled={isLoading}
              >
                Not important
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
          <div className="supqn1-dot active"></div>
          <div className="supqn1-dot active"></div>
        </div>
      </div>
    </div>
  );
};