import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Panel = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  height: 100%;
`;

const PanelTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 24px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Step = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ active, theme }) => 
    active ? `${theme.primary}15` : theme.background};
  border: 1px solid ${({ active, theme }) => 
    active ? theme.primary : theme.border};
  transition: all 0.3s ease;
`;

const StepNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ active, theme }) => 
    active ? theme.primary : theme.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StepContent = styled.div`
  flex: 1;
  color: ${({ active, theme }) => 
    active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '500' : '400'};
`;

const ExplanationPanel = ({ title, explanation, steps = [], currentStep = -1 }) => {
  return (
    <Panel
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PanelTitle>{title}</PanelTitle>
      <Content>{explanation}</Content>
      
      <AnimatePresence>
        <StepsList>
          {steps.map((step, index) => (
            <Step
              key={index}
              active={index === currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StepNumber active={index === currentStep}>
                {index + 1}
              </StepNumber>
              <StepContent active={index === currentStep}>
                {step}
              </StepContent>
            </Step>
          ))}
        </StepsList>
      </AnimatePresence>
    </Panel>
  );
};

export default ExplanationPanel;