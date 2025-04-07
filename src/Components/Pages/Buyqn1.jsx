import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q1.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Buyqn1 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question1);
  const [otherInput, setOtherInput] = useState("");
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

  const handleSubmission = async (answer) => {
    if (!answer) return;
    setIsLoading(true);
    try {
      await updateAnswer(1, answer);
      navigate('/buyqn2');

      // Background submission to Google Sheets
      const url = "https://script.google.com/macros/s/AKfycbwU5KHlTZIf5GLcC6YhgF6je89i_W-hxvZmfMKolYLons2tIUcm_Ho51maQ6SW-fBex1A/exec";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `Answer1=${encodeURIComponent(answer)}`
      }).catch(error => console.error('Submission error:', error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setOtherInput(""); // Clear other input
    handleSubmission(option);
  };

  const handleOtherSubmit = (e) => {
    e.preventDefault();
    const answer = otherInput.trim();
    if (!answer) return;
    setSelectedOption(""); // Clear main option
    handleSubmission(answer);
  };

  return (
    <div>
      <img className="logo2" src={mainLogo} alt="Groundcentered Logo" />
      <div className="supqn1-container">
        <div className="supqn1-card">
          <div className="supqn1-content">
            <div className="supqn1-img">
              <img src={qn1} alt="Drilling Equipment" className="supqn1-image" />
              <Link to='/buyform'>
                <button className="supqn1-nav">←</button>
              </Link>
            </div>
            <div className="supqn1-question">
              <h2>1. What is your biggest challenge when sourcing equipment online?</h2>
              
              {/* Main Options */}
              <div className="supqn1-options">
                <button 
                  type="button"
                  className={`supqn1-button ${selectedOption === 'Finding reliable suppliers' ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect('Finding reliable suppliers')}
                  disabled={isLoading}
                >
                  Finding reliable suppliers
                </button>
                
                <button 
                  type="button"
                  className={`supqn1-button ${selectedOption === 'Ensuring product quality' ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect('Ensuring product quality')}
                  disabled={isLoading}
                >
                  Ensuring product quality
                </button>
              </div>

              {/* Other Input with Submit */}
              <form onSubmit={handleOtherSubmit} className="supqn1-input-group">
                <span className="supqn1-label">Other:</span>
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
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
          <div className="supqn1-dot"></div>
        </div>
      </div>
    </div>
  );
};