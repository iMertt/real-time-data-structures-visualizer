import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import ControlPanel from "../common/ControlPanel";
import ExplanationPanel from "../common/ExplanationPanel";
import { useVisualizer } from "../../context/VisualizerContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StackContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const StackVisualization = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  min-height: 400px;
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 8px;
  position: relative;

  &::before {
    content: "Stack Bottom";
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondary};
  }
`;

const StackItem = styled(motion.div)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => `${theme.primary}dd`}
  );
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    transform: scale(1.02);
  }
`;

const itemVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
};

const StackElement = ({ value, index, total }) => (
  <StackItem
    variants={itemVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    custom={index}
    layoutId={`stack-item-${value}`}
  >
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {value}
    </motion.div>
  </StackItem>
);

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  flex: 1;
  background-color: ${({ theme, variant }) =>
    variant === "danger"
      ? theme.danger
      : variant === "success"
      ? theme.success
      : theme.primary};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "danger"
        ? "#c82333"
        : variant === "success"
        ? "#218838"
        : theme.primaryHover};
  }
`;

const InfoPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [explanation, setExplanation] = useState({
    title: "Stack Operations",
    content:
      "A stack is a linear data structure that follows the Last In First Out (LIFO) principle.",
    steps: [],
    currentStep: -1,
  });

  const {
    animationSpeed,
    stepByStep,
    isAnimating,
    setIsAnimating,
    currentStep,
    setCurrentStep,
  } = useVisualizer();

  const pushToStack = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setOperation("push");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Push Operation",
      content: `Adding element "${inputValue}" to the top of the stack.`,
      steps: [
        `Create a new element with value "${inputValue}"`,
        "Check if there is space in the stack (not shown in this implementation)",
        `Add the element to the top of the stack`,
        "Update the top pointer to reference the new element",
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    if (stepByStep) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (currentStep >= newExplanation.steps.length - 1) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    } else {
      for (let i = 0; i < newExplanation.steps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );
      }
    }

    setStack([...stack, inputValue]);
    setInputValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const popFromStack = async () => {
    if (stack.length === 0 || isAnimating) return;

    setOperation("pop");
    setIsAnimating(true);
    setCurrentStep(0);

    const poppedValue = stack[stack.length - 1];
    const newExplanation = {
      title: "Pop Operation",
      content: `Removing the top element "${poppedValue}" from the stack.`,
      steps: [
        "Check if the stack is empty",
        "Get the element at the top of the stack",
        "Update the top pointer to reference the previous element",
        `Return the popped element "${poppedValue}"`,
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    if (stepByStep) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (currentStep >= newExplanation.steps.length - 1) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    } else {
      for (let i = 0; i < newExplanation.steps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );
      }
    }

    setStack(stack.slice(0, -1));
    setIsAnimating(false);
    setOperation(null);
  };

  const peekStack = () => {
    if (stack.length === 0 || isAnimating) return;

    const peekedValue = stack[stack.length - 1];
    setExplanation({
      title: "Peek Operation",
      content: `Viewing the top element "${peekedValue}" without removing it.`,
      steps: [
        "Check if the stack is empty",
        "Return the element at the top of the stack without removing it",
      ],
      currentStep: -1,
    });
  };

  const clearStack = () => {
    if (isAnimating) return;
    setStack([]);
    setExplanation({
      title: "Clear Operation",
      content: "Removing all elements from the stack.",
      steps: [],
      currentStep: -1,
    });
  };

  const handleNextStep = () => {
    if (currentStep < explanation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Container>
      <Title>Stack Visualizer</Title>
      <ControlPanel />

      <VisualizerContainer>
        <StackContainer>
          <StackVisualization>
            <AnimatePresence>
              {stack.map((item, index) => (
                <StackItem
                  key={`${item}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor:
                      operation === "push" && index === stack.length - 1
                        ? "#28a745"
                        : operation === "pop" && index === stack.length - 1
                        ? "#dc3545"
                        : undefined,
                  }}
                >
                  {item}
                </StackItem>
              ))}
            </AnimatePresence>
          </StackVisualization>

          <ControlsContainer>
            <InputGroup>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                disabled={isAnimating}
              />
            </InputGroup>

            <ButtonGroup>
              <Button
                onClick={pushToStack}
                disabled={isAnimating || !inputValue.trim()}
              >
                Push
              </Button>
              <Button
                onClick={popFromStack}
                disabled={isAnimating || stack.length === 0}
                variant="danger"
              >
                Pop
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button
                onClick={peekStack}
                disabled={isAnimating || stack.length === 0}
                variant="success"
              >
                Peek
              </Button>
              <Button
                onClick={clearStack}
                disabled={isAnimating || stack.length === 0}
                variant="danger"
              >
                Clear
              </Button>
            </ButtonGroup>

            {stepByStep && isAnimating && (
              <Button
                onClick={handleNextStep}
                disabled={currentStep >= explanation.steps.length - 1}
              >
                Next Step
              </Button>
            )}
          </ControlsContainer>
        </StackContainer>

        <InfoPanel>
          <ExplanationPanel
            title={explanation.title}
            explanation={explanation.content}
            steps={explanation.steps}
            currentStep={currentStep}
          />
        </InfoPanel>
      </VisualizerContainer>
    </Container>
  );
};

export default StackVisualizer;
