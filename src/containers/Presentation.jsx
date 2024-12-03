import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Presentation = () => {
  return (
    <Container>
      <Content>
        <WelcomeMessage>Bienvenido a Clio 7f</WelcomeMessage>
        <InformationMessage>
          "Conoce el corazón de tu empresa"
          <p>Estamos aquí para ayudarte a medir y mejorar el clima organizacional. 
            Porque el bienestar de tu equipo es clave para alcanzar el éxito.</p>
        </InformationMessage>
      </Content>
      <Button>
        <StyledLink to={'/informedConsent'}>¡Comencemos!</StyledLink>
        </Button>
    </Container>
  );
};

export default Presentation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: rgb(176, 216, 255);
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InformationMessage = styled.div`
  font-size: 1.25rem;
  color: #666;
  margin: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin: 10px;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #666;
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 200px;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: gray;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    padding: 5px 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;