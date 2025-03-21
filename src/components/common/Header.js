import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeaderContainer = styled.header`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.info}
  );
  padding: 1rem 2rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => (active ? "100%" : "0")};
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const ThemeToggle = styled(motion.button)`
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Header = ({ toggleTheme, currentTheme }) => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Nav>
        <NavLink
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <svg viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          DataViz
        </NavLink>

        <NavLinks>
          <NavLink to="/stack" active={location.pathname === "/stack" ? 1 : 0}>
            Stack
          </NavLink>
          <NavLink to="/queue" active={location.pathname === "/queue" ? 1 : 0}>
            Queue
          </NavLink>
          <NavLink
            to="/linked-list"
            active={location.pathname === "/linked-list" ? 1 : 0}
          >
            Linked List
          </NavLink>

          <ThemeToggle
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentTheme === "light" ? "🌙" : "☀️"}
          </ThemeToggle>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
