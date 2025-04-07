import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useSupplierContext } from '../../context/SupplierContext';
import qn1 from '../Images/877ae7eb6221007d964ca02b488364fc.jpg';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Supqn7 = () => {
  const navigate = useNavigate();
  const { supplierData, updateAnswer, submitToWaitingList } = useSupplierContext();
  const [selectedOption, setSelectedOption] = useState(supplierData.answers.question6);
  const [otherInput, setOtherInput] = useState('');
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
      const url = "https://script.google.com/macros/s/AKfycbwr6yoFGKPGJBO2DR_YvGXaZqnoRicLSCas63mJqNJTgXEZ9mVOjQ_CL5O_gLwNQpsS/exec";
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

  const handleOtherSubmit = async (e) => {
    e.preventDefault();
    if (!otherInput.trim()) return;
    // You can update the answer with the other input text
    await updateAnswer(7, otherInput);
    handleSubmission(otherInput);
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
              <h2>
                7. What's the number 1 thing you'd change about how you sell <br /> equipment today?
              </h2>

              {/* Other Input with Submit */}
              <form onSubmit={handleOtherSubmit} className="supqn1-input-group">
                <span className="supqn1-label">Answer</span>
                <div className="supqn1-input-with-button">
                  <textarea 
                    placeholder="Please Specify" 
                    className="supqn1-input"
                    value={otherInput}
                    onChange={(e) => setOtherInput(e.target.value)}
                    rows="1"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit"
                    className="supqn1-submit-button"
                    disabled={!otherInput.trim() || isLoading}
                  >
                    {isLoading ? '...' : 'Submit'}
                  </button>
                </div>
              </form>
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
      <footer className="footer">
        <p>groundcentered.com © 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};
