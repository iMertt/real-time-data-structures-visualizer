import React, { createContext, useState, useContext } from 'react';

const VisualizerContext = createContext();

export const useVisualizer = () => useContext(VisualizerContext);

export const VisualizerProvider = ({ children }) => {
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [stepByStep, setStepByStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const value = {
    animationSpeed,
    setAnimationSpeed,
    stepByStep,
    setStepByStep,
    currentStep,
    setCurrentStep,
    isAnimating,
    setIsAnimating
  };
  
  return (
    <VisualizerContext.Provider value={value}>
      {children}
    </VisualizerContext.Provider>
  );
};