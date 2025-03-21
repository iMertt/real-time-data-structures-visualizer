import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useVisualizer } from '../../context/VisualizerContext';

const Panel = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 200px;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.border};
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Switch = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
`;

const SwitchInput = styled.input`
  display: none;
  
  &:checked + span {
    background: ${({ theme }) => theme.primary};
    
    &::before {
      transform: translateX(20px);
    }
  }
`;

const SwitchSlider = styled.span`
  position: relative;
  width: 40px;
  height: 20px;
  background: ${({ theme }) => theme.border};
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`;

const ControlPanel = () => {
  const { 
    animationSpeed, 
    setAnimationSpeed,
    stepByStep,
    setStepByStep
  } = useVisualizer();

  return (
    <Panel
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Controls>
        <Control>
          <Label>Animation Speed</Label>
          <Slider
            type="range"
            min="1"
            max="5"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
          />
        </Control>
        
        <Control>
          <Label>Step by Step</Label>
          <Switch>
            <SwitchInput
              type="checkbox"
              checked={stepByStep}
              onChange={(e) => setStepByStep(e.target.checked)}
            />
            <SwitchSlider />
          </Switch>
        </Control>
      </Controls>
    </Panel>
  );
};

export default ControlPanel;