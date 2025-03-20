import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useSupplierContext } from '../../context/SupplierContext';
import qn1 from '../Images/q5.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Supqn5 = () => {
  const navigate = useNavigate();
  const { supplierData, updateAnswer } = useSupplierContext();
  const [selectedOption, setSelectedOption] = useState(supplierData.answers.question5);
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

  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    if(!selectedOption) return;
    setIsLoading(true);
    // Replace the URL below with your actual Google Apps Script URL
    const url = "https://script.google.com/macros/s/AKfycbzJl79if_3uQxsdZcgX7L1nsBCwJGgpslkxGCD6W7xXCv9Kk_1PZsKXEe9_plUemQk/exec";
    try {
      // Update answer in context
      await updateAnswer(5, selectedOption);
      // Submit answer to Google Sheets with Answer5 parameter
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `Answer5=${encodeURIComponent(selectedOption)}`
      });
      const result = await response.text();
      console.log('Response from Google Sheets:', result);
      // Navigate to the next page
      navigate('/supqn6');
    } catch (error) {
      console.error('Error submitting answer:', error);
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
              <Link to='/supqn4'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>5. How often do you update or expand your product catalog?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Daily/Weekly' ? 'selected' : ''}`}
                onClick={() => setSelectedOption('Daily/Weekly')}
                disabled={isLoading}
              >
                Daily/Weekly
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Monthly' ? 'selected' : ''}`}
                onClick={() => setSelectedOption('Monthly')}
                disabled={isLoading}
              >
                Monthly
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Rarely' ? 'selected' : ''}`}
                onClick={() => setSelectedOption('Rarely')}
                disabled={isLoading}
              >
                Rarely
              </button>
              <button 
                className="supqn1-submit-button"
                onClick={handleSubmit}
                disabled={isLoading || !selectedOption}
              >
                {isLoading ? 'Loading...' : 'Next'}
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
          <div className="supqn1-dot"></div>
        </div>
      </div>
    </div>
  );
};
