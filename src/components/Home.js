import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.info}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
  text-align: center;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Home = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <Hero>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Data Structures Visualizer
        </Title>
        <Subtitle>
          Interactive visualizations to help you understand data structures and
          algorithms
        </Subtitle>
      </Hero>

      <Grid>
        <Card
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          whileHover={{ y: -10 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 21v-13h4v13zm6-13h4v13h-4zm6 0h4v13h-4z" />
          </svg>
          <CardTitle>Stack</CardTitle>
          <CardDescription>
            Visualize LIFO (Last In, First Out) operations with interactive
            animations
          </CardDescription>
          <StyledLink to="/stack">Try Stack</StyledLink>
        </Card>

        <Card
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          whileHover={{ y: -10 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 10h16v4H4zm0-6h16v4H4zm0 12h16v4H4z" />
          </svg>
          <CardTitle>Queue</CardTitle>
          <CardDescription>
            Explore FIFO (First In, First Out) operations with step-by-step
            visualization
          </CardDescription>
          <StyledLink to="/queue">Try Queue</StyledLink>
        </Card>

        <Card
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          whileHover={{ y: -10 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h2v2H4zm14 0h2v2h-2zM4 11h2v2H4zm14 0h2v2h-2zM4 16h2v2H4zm14 0h2v2h-2zM8 6h8v2H8zm0 5h8v2H8zm0 5h8v2H8z" />
          </svg>
          <CardTitle>Linked List</CardTitle>
          <CardDescription>
            Learn about nodes and references with dynamic linked list operations
          </CardDescription>
          <StyledLink to="/linked-list">Try Linked List</StyledLink>
        </Card>
      </Grid>
    </Container>
  );
};

export default Home;
