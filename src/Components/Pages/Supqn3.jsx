import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import { useSupplierContext } from '../../context/SupplierContext';
import qn1 from '../Images/q3.png';
import Logo2 from '../Images/logo2.png';
import "./Pages.css";

export const Supqn3 = () => {
  const navigate = useNavigate();
  const { supplierData, updateAnswer } = useSupplierContext();
  const [selectedOption, setSelectedOption] = useState(supplierData.answers.question3);
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
      await updateAnswer(3, option);
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/supqn4');
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
              <Link to='/supqn2'><button className="supqn1-nav">←</button></Link>
            </div>
            <div className="supqn1-question">
              <h2>3. Would free onboarding and professional product listing <br /> content creation be helpful?</h2>
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
                className={`supqn1-button ${selectedOption === 'Maybe' ? 'selected' : ''}`}
                onClick={() => handleOptionSelect('Maybe')}
                disabled={isLoading}
              >
                Maybe
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
