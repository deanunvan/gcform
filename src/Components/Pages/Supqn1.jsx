import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useSupplierContext } from '../../context/SupplierContext';
import qn1 from '../Images/q1.png';
import mainLogo from '../Images/main logo.png';
import "./Pages.css";

export const Supqn1 = () => {
  const navigate = useNavigate();
  const { supplierData, updateAnswer } = useSupplierContext();
  const [selectedOption, setSelectedOption] = useState(supplierData.answers.question1);
  const [otherInput, setOtherInput] = useState("");
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
    sr.reveal('.supqn1-input-group', { origin: 'bottom', delay: 1400, distance: '30px' });

    return () => sr.destroy();
  }, []);

  const handleSubmission = async (answer) => {
    if (!answer) return;
    setIsLoading(true);
    try {
      await updateAnswer(1, answer);
      navigate('/supqn2');

      // Background submission to Google Sheets
      const url = "https://script.google.com/macros/s/AKfycbzJl79if_3uQxsdZcgX7L1nsBCwJGgpslkxGCD6W7xXCv9Kk_1PZsKXEe9_plUemQk/exec";
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
              <Link to='/supform'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>1. What is your biggest challenge in selling equipment online?</h2>
              
              {/* Main Options */}
              <div className="supqn1-options">
                <button 
                  className={`supqn1-button ${selectedOption === 'Technical difficulties' ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect('Technical difficulties')}
                  disabled={isLoading}
                >
                  Technical difficulties
                </button>
                
                <button 
                  className={`supqn1-button ${selectedOption === 'Finding buyers' ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect('Finding buyers')}
                  disabled={isLoading}
                >
                  Finding buyers
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