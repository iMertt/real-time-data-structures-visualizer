import styled from "styled-components";
import { motion } from "framer-motion";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { VisualizerProvider } from "./context/VisualizerContext";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/Themes";
import useThemeToggle from "./hooks/useThemeToggle";

import Header from "./components/common/Header";

import Home from "./components/Home";
import StackVisualizer from "./components/dataStructures/StackVisualizer";
import QueueVisualizer from "./components/dataStructures/QueueVisualizer";
import LinkedListVisualizer from "./components/dataStructures/LinkedListVisualizer";

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const MainContent = styled(motion.main)`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const App = () => {
  const [theme, toggleTheme] = useThemeToggle();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <VisualizerProvider>
        <BrowserRouter>
          <AppContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header toggleTheme={toggleTheme} currentTheme={theme} />
            <MainContent>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stack" element={<StackVisualizer />} />
                  <Route path="/queue" element={<QueueVisualizer />} />
                  <Route
                    path="/linked-list"
                    element={<LinkedListVisualizer />}
                  />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </MainContent>
          </AppContainer>
        </BrowserRouter>
      </VisualizerProvider>
    </ThemeProvider>
  );
};

export default App;
