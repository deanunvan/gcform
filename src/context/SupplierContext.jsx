import React, { createContext, useContext, useState } from 'react';

const SupplierContext = createContext();

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplierContext must be used within a SupplierProvider');
  }
  return context;
};

export const SupplierProvider = ({ children }) => {
  const [supplierData, setSupplierData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      countryCode: '',
    },
    answers: {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
    },
  });

  const updateAnswer = async (questionNumber, answer) => {
    setSupplierData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [`question${questionNumber}`]: answer,
      },
    }));
  };

  const updatePersonalInfo = (info) => {
    setSupplierData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const submitToWaitingList = async () => {
    // Here you would typically make an API call to your backend
    console.log('Submitting supplier data to waiting list:', supplierData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  return (
    <SupplierContext.Provider value={{
      supplierData,
      updateAnswer,
      updatePersonalInfo,
      submitToWaitingList,
    }}>
      {children}
    </SupplierContext.Provider>
  );
}; 