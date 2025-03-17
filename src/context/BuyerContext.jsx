import React, { createContext, useState, useContext } from 'react';

const BuyerContext = createContext();

export const BuyerProvider = ({ children }) => {
  const [buyerData, setBuyerData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      countryCode: '+234'
    },
    answers: {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: ''
    }
  });

  const updatePersonalInfo = (info) => {
    setBuyerData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateAnswer = (questionNumber, answer) => {
    setBuyerData(prev => ({
      ...prev,
      answers: { ...prev.answers, [`question${questionNumber}`]: answer }
    }));
  };

  const submitToWaitingList = async () => {
    // Here you would implement the API call to your backend
    console.log('Submitting to waiting list:', buyerData);
    // TODO: Implement actual API call
    return true;
  };

  return (
    <BuyerContext.Provider value={{
      buyerData,
      updatePersonalInfo,
      updateAnswer,
      submitToWaitingList
    }}>
      {children}
    </BuyerContext.Provider>
  );
};

export const useBuyerContext = () => {
  const context = useContext(BuyerContext);
  if (!context) {
    throw new Error('useBuyerContext must be used within a BuyerProvider');
  }
  return context;
}; 