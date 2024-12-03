import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    '/informedConsent',
    '/listConsent',
    '/remember',
  ];

  // Encuentra el índice de la página actual
  const currentIndex = pages.indexOf(location.pathname);

  if (currentIndex === -1) {
    console.error('Current path not found in pages array:', location.pathname);
    return null;
  }

  const handleLeftClick = () => {
    if (currentIndex > 0) {
      navigate(pages[currentIndex - 1]);
    }
  };

  const handleRightClick = () => {
    if (currentIndex < pages.length - 1) {
      navigate(pages[currentIndex + 1]);
    }
  };

  return (
    <FooterContainer>
      <ArrowButton onClick={handleLeftClick} disabled={currentIndex === 0}>
        <img src={leftArrow} alt="Left Arrow" />
      </ArrowButton>
      <ArrowButton onClick={handleRightClick} disabled={currentIndex === pages.length - 1}>
        <img src={rightArrow} alt="Right Arrow" />
      </ArrowButton>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  margin: 10px;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(140, 196, 252, 0.8);
  border-top: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 100);
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  padding: 5px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;
