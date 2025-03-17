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
      duration: 2500,
      delay: 400
    });

    // Logo animation
    sr.reveal('.logo2', {
      origin: 'top',
      delay: 200
    });

    // Image and back button animations
    sr.reveal('.supqn1-image', {
      origin: 'left',
      delay: 600,
      distance: '100px'
    });

    sr.reveal('.supqn1-nav', {
      origin: 'bottom',
      delay: 800,
      distance: '20px'
    });

    // Question section animations
    sr.reveal('.supqn1-question h2', {
      origin: 'right',
      delay: 1000,
      distance: '80px'
    });

    // Buttons animation with interval
    sr.reveal('.supqn1-button', {
      origin: 'right',
      interval: 200,
      delay: 1200,
      distance: '50px'
    });

    // Input group animation
    sr.reveal('.supqn1-input-group', {
      origin: 'bottom',
      delay: 1400,
      distance: '30px'
    });

    // Progress dots animation
    sr.reveal('.supqn1-dot', {
      origin: 'bottom',
      interval: 100,
      delay: 1600,
      distance: '20px'
    });

    return () => sr.destroy();
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      await updateAnswer(1, option);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/buyqn2');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!otherInput.trim()) return;
    setIsLoading(true);
    try {
      await updateAnswer(1, otherInput);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/buyqn2');
    } catch (error) {
      console.error('Error:', error);
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
              <Link to='/buyform'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>1. What is your biggest challenge when sourcing equipment online?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Finding reliable suppliers' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Finding reliable suppliers')}
                disabled={isLoading}
              >
                Finding reliable suppliers
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Ensuring product quality' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Ensuring product quality')}
                disabled={isLoading}
              >
                Ensuring product quality
              </button>
              <div className="supqn1-input-group">
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
                  {otherInput && (
                    <button 
                      className="supqn1-submit-button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  )}
                </div>
              </div>
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


