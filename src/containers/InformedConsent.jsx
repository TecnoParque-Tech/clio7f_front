import React from 'react'; 
import styled from 'styled-components';

const InformedConsent = () => {
    return ( 
      <Container>
        <Content>
          <Title>Consentimiento informado</Title>
          <InformationMessage>
            <p>
            El clima organizacional consiste en las percepciones de los trabajadores sobre ciertas características de la organización, y como ello influye en las relaciones que se generan en el contexto de trabajo. Conocer las percepciones de los trabajadores, ayuda a las empresas mejorar los procesos de gestión organizacional.
            Para participar en esta evaluación, usted debe estar de acuerdo con los siguientes puntos, en caso contrario puede retirarse del proceso de evaluación, no obstante, es importante que tenga en cuenta que el bienestar humano en la organización, es una responsabilidad del empleador, que requiere de la colaboración de todas las personas que conforman la instrucción.   
            </p>
          </InformationMessage>
        </Content>
      </Container>
    );
};

export default InformedConsent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  background-color: rgb(176, 216, 255);

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

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin: 10px;
  }
`;

const InformationMessage = styled.div`
  font-size: 1.25rem;
  text-align: justify;
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
