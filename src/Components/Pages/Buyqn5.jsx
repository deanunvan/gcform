import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useBuyerContext } from '../../context/BuyerContext';
import qn1 from '../Images/q5.png';
import Logo2 from '../Images/logo2.png';
import "./Pages.css";

export const Buyqn5 = () => {
  const navigate = useNavigate();
  const { buyerData, updateAnswer } = useBuyerContext();
  const [selectedOption, setSelectedOption] = useState(buyerData.answers.question5);
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

    return () => sr.destroy();
  }, []);

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setIsLoading(true);
    try {
      await updateAnswer(5, option);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/buyqn6');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <img className="logo2" src={Logo2} alt="Groundcentered Logo" />
      <div className="supqn1-container">
        <div className="supqn1-card">
          <div className="supqn1-content">
            <div className="supqn1-img">
              <img src={qn1} alt="Drilling Equipment" className="supqn1-image" />
              <Link to='/buyqn4'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>5. How frequently do you purchase equipment for your business?</h2>
              <button 
                className={`supqn1-button ${selectedOption === 'Daily/Weekly' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Daily/Weekly')}
                disabled={isLoading}
              >
                Daily/Weekly
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Monthly' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Monthly')}
                disabled={isLoading}
              >
                Monthly
              </button>
              <button 
                className={`supqn1-button ${selectedOption === 'Quarterly or less' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Quarterly or less')}
                disabled={isLoading}
              >
                Quarterly or less
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


