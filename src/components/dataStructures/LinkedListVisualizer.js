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

const LinkedListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const ListVisualization = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
  min-height: 150px;
  padding: 2rem;
  position: relative;
`;

const NodeContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Node = styled(motion.div)`
  width: 120px;
  height: 120px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => `${theme.primary}dd`}
  );
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const NodeValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const NodePointer = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const Arrow = styled(motion.div)`
  width: 50px;
  height: 2px;
  background: ${({ theme }) => theme.primary};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: -4px;
    border-left: 8px solid ${({ theme }) => theme.primary};
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
`;

const nodeVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotateY: 90,
  },
  animate: {
    opacity: 1,
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
    scale: 0.5,
    rotateY: -90,
    transition: {
      duration: 0.3,
    },
  },
};

const arrowVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.2,
    },
  },
};

const ListNode = ({ value, isLast }) => (
  <NodeContainer
    variants={nodeVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    layoutId={`node-${value}`}
  >
    <Node
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <NodeValue>{value}</NodeValue>
      <NodePointer>next {isLast ? "→ null" : ""}</NodePointer>
    </Node>
    {!isLast && (
      <Arrow variants={arrowVariants} initial="initial" animate="animate" />
    )}
  </NodeContainer>
);

const ListNodeValue = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

const NodeIndex = styled.div`
  position: absolute;
  top: -1.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
`;

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

const IndexInput = styled(Input)`
  width: 80px;
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

const LinkedListVisualization = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 2rem;
  min-height: 200px;
  width: 100%;
  position: relative;
`;

const LinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [explanation, setExplanation] = useState({
    title: "Linked List Operations",
    content:
      "A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.",
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

  const insertAtHead = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setOperation("insertHead");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Insert at Head",
      content: `Adding node with value "${inputValue}" at the beginning of the list.`,
      steps: [
        `Create a new node with value "${inputValue}"`,
        "Set the new node's next pointer to the current head",
        "Update the head to point to the new node",
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    await animateOperation(newExplanation.steps.length);

    setList([inputValue, ...list]);
    setInputValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const insertAtTail = async () => {
    if (!inputValue.trim() || isAnimating) return;

    setOperation("insertTail");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Insert at Tail",
      content: `Adding node with value "${inputValue}" at the end of the list.`,
      steps: [
        `Create a new node with value "${inputValue}"`,
        "Traverse to the last node",
        "Update the last node's next pointer to the new node",
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    await animateOperation(newExplanation.steps.length);

    setList([...list, inputValue]);
    setInputValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const insertAtIndex = async () => {
    if (!inputValue.trim() || !indexValue.trim() || isAnimating) return;

    const index = parseInt(indexValue);
    if (index < 0 || index > list.length) return;

    setOperation("insertIndex");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Insert at Index",
      content: `Adding node with value "${inputValue}" at index ${index}.`,
      steps: [
        `Create a new node with value "${inputValue}"`,
        `Traverse to position ${index}`,
        "Update the next pointers to insert the new node",
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    await animateOperation(newExplanation.steps.length);

    const newList = [...list];
    newList.splice(index, 0, inputValue);
    setList(newList);
    setInputValue("");
    setIndexValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const deleteAtIndex = async () => {
    if (!indexValue.trim() || isAnimating || list.length === 0) return;

    const index = parseInt(indexValue);
    if (index < 0 || index >= list.length) return;

    setOperation("delete");
    setIsAnimating(true);
    setCurrentStep(0);

    const newExplanation = {
      title: "Delete at Index",
      content: `Removing node at index ${index}.`,
      steps: [
        `Traverse to position ${index}`,
        "Update the next pointers to bypass the node",
        "Remove the node from memory",
      ],
      currentStep: 0,
    };
    setExplanation(newExplanation);

    await animateOperation(newExplanation.steps.length);

    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setIndexValue("");
    setIsAnimating(false);
    setOperation(null);
  };

  const animateOperation = async (steps) => {
    if (stepByStep) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (currentStep >= steps - 1) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    } else {
      for (let i = 0; i < steps; i++) {
        setCurrentStep(i);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 / animationSpeed)
        );
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < explanation.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Container>
      <Title>Linked List Visualizer</Title>
      <VisualizerContainer>
        <LinkedListContainer>
          {" "}
          {/* ListContainer yerine LinkedListContainer kullanıldı */}
          <LinkedListVisualization>
            <AnimatePresence>
              {list.map((value, index) => (
                <ListNode
                  key={`${value}-${index}`}
                  value={value}
                  isLast={index === list.length - 1}
                />
              ))}
            </AnimatePresence>
          </LinkedListVisualization>
          <ControlsContainer>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <IndexInput
                type="number"
                placeholder="Index"
                value={indexValue}
                onChange={(e) => setIndexValue(e.target.value)}
              />
            </InputGroup>

            <ButtonGroup>
              <Button onClick={insertAtHead}>Insert Head</Button>
              <Button onClick={insertAtTail}>Insert Tail</Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button onClick={insertAtIndex}>Insert at Index</Button>
              <Button variant="danger" onClick={deleteAtIndex}>
                Delete at Index
              </Button>
            </ButtonGroup>
          </ControlsContainer>
        </LinkedListContainer>

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

export default LinkedListVisualizer;
