import React from 'react';
import styled from 'styled-components';

const Presentation = () => {
  const handleSubmit = () => {
    const input = document.getElementById('nit-input');
    if (!input.value) {
      alert('Por favor ingrese el NIT o documento de identidad.');
    } else {
      const isConfirmed = window.confirm(`¿Es correcto el valor ingresado: ${input.value}?`);
      if (isConfirmed) {
        window.location.href = '/textintroductory';
      }
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    event.target.value = value.replace(/\D/g, '');
  };

  return (
    <Container>
      <Content>
        <WelcomeMessage>!Hola¡</WelcomeMessage>
        <InformationMessage>
          <p>
            Antes de comenzar, ingresa por favor el NIT o documento de identidad 
            de la empresa sin puntos, comas o dígito de verificación.
          </p>
          <Input 
            id="nit-input" 
            type="text" 
            placeholder="Ingrese NIT o documento de identidad" 
            pattern="\d*" 
            required 
            onChange={handleInputChange} 
          />
        </InformationMessage>
      </Content>
      <Button onClick={handleSubmit}>
        ¡Comencemos!
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

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  pattern: "\\d*";
  required: true;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 5px;
  }
`;