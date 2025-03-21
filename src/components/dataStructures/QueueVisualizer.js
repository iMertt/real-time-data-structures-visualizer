import React, { useState } from "react";
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

const QueueContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const QueueVisualization = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  min-height: 120px;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  border: 2px dashed ${({ theme }) => theme.border};
  border-radius: 8px;
  position: relative;
  overflow-x: auto;

  &::before {
    content: "Front";
    position: absolute;
    left: 10px;
    top: -25px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondary};
  }

  &::after {
    content: "Rear";
    position: absolute;
    right: 10px;
    top: -25px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.secondary};
  }
`;

const QueueItem = styled(motion.div)`
  min-width: 100px;
  height: 100px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => `${theme.primary}dd`}
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 500;
  font-size: 1.2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    display: ${({ isLast }) => (isLast ? "none" : "block")};
  }
`;

const itemVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.8,
    rotateY: 90,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.8,
    rotateY: -90,
    transition: {
      duration: 0.4,
    },
  },
};

const QueueElement = ({ value, index, isLast }) => (
  <QueueItem
    variants={itemVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    layoutId={`queue-item-${value}`}
    isLast={isLast}
  >
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {value}
    </motion.div>
  </QueueItem>
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

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [explanation, setExplanation] = useState({
    title: "Queue Operations",
    content:
      "A queue is a linear data structure that follows the First In First Out (FIFO) principle.",
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

  const enqueue = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setOperation("enqueue");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Enqueue Operation",
      content: `Adding element "${inputValue}" to the rear of the queue.`,
      steps: [
        `Create a new element with value "${inputValue}"`,
        "Check if there is space in the queue",
        "Add the element to the rear of the queue",
        "Update the rear pointer",
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

    setQueue([...queue, inputValue]);
    setInputValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const dequeue = async () => {
    if (queue.length === 0 || isAnimating) return;

    setOperation("dequeue");
    setIsAnimating(true);
    setCurrentStep(0);

    const dequeuedValue = queue[0];
    const newExplanation = {
      title: "Dequeue Operation",
      content: `Removing element "${dequeuedValue}" from the front of the queue.`,
      steps: [
        "Check if the queue is empty",
        "Get the element at the front of the queue",
        "Remove the front element",
        "Update the front pointer",
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

    setQueue(queue.slice(1));
    setIsAnimating(false);
    setOperation(null);
  };

  const peekQueue = () => {
    if (queue.length === 0 || isAnimating) return;

    const frontValue = queue[0];
    setExplanation({
      title: "Peek Operation",
      content: `Viewing the front element "${frontValue}" without removing it.`,
      steps: [
        "Check if the queue is empty",
        "Return the element at the front of the queue without removing it",
      ],
      currentStep: -1,
    });
  };

  const clearQueue = () => {
    if (isAnimating) return;
    setQueue([]);
    setExplanation({
      title: "Clear Operation",
      content: "Removing all elements from the queue.",
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
      <Title>Queue Visualizer</Title>
      <ControlPanel />

      <VisualizerContainer>
        <QueueContainer>
          <QueueVisualization>
            <AnimatePresence>
              {queue.map((item, index) => (
                <QueueItem
                  key={`${item}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor:
                      operation === "enqueue" && index === queue.length - 1
                        ? "#28a745"
                        : operation === "dequeue" && index === 0
                        ? "#dc3545"
                        : undefined,
                  }}
                >
                  {item}
                </QueueItem>
              ))}
            </AnimatePresence>
          </QueueVisualization>

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
                onClick={enqueue}
                disabled={isAnimating || !inputValue.trim()}
              >
                Enqueue
              </Button>
              <Button
                onClick={dequeue}
                disabled={isAnimating || queue.length === 0}
                variant="danger"
              >
                Dequeue
              </Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button
                onClick={peekQueue}
                disabled={isAnimating || queue.length === 0}
                variant="success"
              >
                Peek
              </Button>
              <Button
                onClick={clearQueue}
                disabled={isAnimating || queue.length === 0}
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
        </QueueContainer>

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

export default QueueVisualizer;
