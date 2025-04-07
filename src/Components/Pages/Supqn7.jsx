import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useSupplierContext } from '../../context/SupplierContext';
import qn1 from '../Images/q4.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Supqn7 = () => {
  const navigate = useNavigate();
  const { supplierData, updateAnswer, submitToWaitingList } = useSupplierContext();
  const [selectedOption, setSelectedOption] = useState(supplierData.answers.question6);
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

  const handleSubmission = async (option) => {
    if (!option) return;
    setIsLoading(true);
    try {
      // Update context and navigate immediately
      await updateAnswer(7, option);
      navigate('/thank-you');

      // Background submissions
      const url = "https://script.google.com/macros/s/AKfycbxcLZRtvocs52dukka_oYpFVGfSvkL7fjECbRLReUbibeRC5z1Bk8dY5ZtJXGj4g9g/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer7=${encodeURIComponent(option)}`
      }).catch(error => console.error('Sheets submission error:', error));

      if (submitToWaitingList) {
        submitToWaitingList().catch(error => console.error('Waiting list error:', error));
      }
    } catch (error) {
      console.error('Error updating answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    handleSubmission(option);
  };

  return (
    <div>
      <img className="logo2" src={mainLogo} alt="Groundcentered Logo" />
      <div className="supqn1-container">
        <div className="supqn1-card">
          <div className="supqn1-content">
            <div className="supqn1-img">
              <img src={qn1} alt="Drilling Equipment" className="supqn1-image" />
              <Link to='/supqn6'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>7. What's the number 1 thing you'd change about how you sell <br /> equipment today?
              </h2>
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