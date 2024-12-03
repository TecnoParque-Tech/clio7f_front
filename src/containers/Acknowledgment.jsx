import React from 'react';
import styled from 'styled-components';

const Acknowledgment = () => {
  return (
    <Container>
      <Content>
      <Tittle>¡Gracias!</Tittle>
      <InformationMessage>Gracias por haber realizado la prueba. Apreciamos tu tiempo y esfuerzo.
        <p>Te estaremos contando si necesitmos algo mas.</p>
      </InformationMessage>
      </Content>
    </Container>
  );
};

export default Acknowledgment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: rgb(176, 216, 255);
  padding: 20px;
`;

const Content = styled.div`
  text-align: justify;
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

const Tittle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const InformationMessage = styled.div`
  font-size: 1.25rem;
  color: #666;
  margin: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin: 10px;
  }
`;
