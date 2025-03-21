import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: ${({ theme }) => theme.transition};
    line-height: 1.6;
  }
  
  main {
    min-height: calc(100vh - 140px);
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  button {
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 600;
    font-size: 0.95rem;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    transition: ${({ theme }) => theme.transition};
    
    &:hover {
      background-color: ${({ theme }) => theme.primaryHover};
      transform: translateY(-2px);
    }
    
    &:disabled {
      background-color: ${({ theme }) => theme.secondary};
      cursor: not-allowed;
      transform: none;
    }
  }
  
  input {
    padding: 12px;
    border: 2px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.text};
    font-size: 0.95rem;
    transition: ${({ theme }) => theme.transition};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primary}30`};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(120deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.info});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;