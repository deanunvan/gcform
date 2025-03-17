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

    return () => sr.destroy();
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      await updateAnswer(2, option);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/buyqn3');
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
      await updateAnswer(2, otherInput);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/buyqn3');
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
              <Link to='/buyqn1'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>2. How do you currently source equipment?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Online marketplace' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Online marketplace')}
                disabled={isLoading}
              >
                Online marketplace
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Directly from manufacturers' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Directly from manufacturers')}
                disabled={isLoading}
              >
                Directly from manufacturers
              </button>
              <button 
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


