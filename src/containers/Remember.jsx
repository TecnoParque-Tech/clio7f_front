import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Remember = () => {
  return (
    <Container>
      <Content>
        <Tittle>Recuerda</Tittle>
        <InformationMessage>
          <p>
            Recuerde que las apreciaciones de los colaboradores son muy
            importantes para la organización y constituyen un mecanismo de
            participación dentro de la misma. </p>
            <p>Hago constar que la información
            aquí consignada ha sido leída y entendida por mí en su totalidad.
          </p>
        </InformationMessage>
      </Content>
      <ButtonContainer>
        <Button>
          <StyledLink to={"/personalinformation"}>Acepto</StyledLink>
        </Button>
        <Button>
          <StyledLink to={"/presentation"}>No Acepto</StyledLink>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Remember;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: white;
  padding: 20px;
`;

const Content = styled.div`
  text-align: justify;
  background-color: rgb(0,142,188,255);
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
  color: white;
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
  color: white;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: rgb(0,142,188,255);
  color: white;
  font-size: 1.2rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 100);
  max-width: 200px;

  &:hover {
    background-color: white;
    color: gray;
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
