import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import rightArrow from "../assets/right-arrow.png";

const Presentation = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <WelcomeMessage>Invitación a participar de la Encuesta de Clima Organizacional CLIO 7F</WelcomeMessage>
        <InformationMessage>
          <p>
            ¡Hola! recibe un saludo de parte de la alianza Fundación
            Universitaria María Cano & Grupo Humano Consultores, para la
            investigación, la formación y la innovación. Como parte de nuestro
            propósito de generar valor en las Organizaciones, te invitamos a
            diligenciar la siguiente encuesta. Son preguntas muy sencillas con
            las que ayudarás a descubrir cómo está tu Organización con relación
            al Clima Organizacional, el cual hace referencia a las percepciones
            compartidas sobre los atributos de una organización, lo que acontece
            dentro de la misma, y cómo estás influencian el relacionamiento con
            la organización, entre sus miembros y grupos de interés (Pacheco &
            Rodríguez, 2019). Por favor lee con detenimiento cada pregunta y
            contesta lo más sinceramente posible (no desde “cómo debería estar”,
            sino “cómo crees que está actualmente”). Trata de usar las
            respuestas intermedias como Ni de acuerdo ni en desacuerdo, solo
            cuando definitivamente no te identifiques con ninguna otra opción,
            esto con el fin de conocer más tu posición. No hay respuestas buenas
            ni malas, todas las apreciaciones son importantes, y nos permitirán
            conocer lo que piensan los miembros sobre su entorno de trabajo. El
            instrumento de evaluación y Monitoreo del Clima organizacional CLIO
            7F se compone por 35 ítems distribuidos en siete (7) dimensiones
            globales: Relacionamiento con el líder, Relacionamiento con el
            equipo de trabajo, Identificación con la organización, Claridad y
            Comunicación organizacional, Factores ambientales, Compensación,
            Beneficios. Los reactivos buscan conocer la percepción de los
            empleados, en relación a diferentes situaciones propias del entorno
            laboral. Diligenciarla te tomará alrededor de 20-30 minutos. Busca
            un espacio tranquilo para hacerlo. Tus respuestas son
            confidenciales, de manera que los datos serán tratados a nivel
            general y en ningún caso, se dará a conocer respuestas individuales
            ni identidad del participante. 
          </p>
          <p>¡Saludos y muchos éxitos!</p>
        </InformationMessage>
      </Content>
      <Button onClick={() => navigate("/informedConsent")}>
        <img src={rightArrow} alt="Continuar" />
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
  min-height: 100vh;
  background-color: white;
  padding: 20px;
  margin: 0;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Content = styled.div`
  text-align: center;
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

const InformationMessage = styled.div`
  font-size: 1.25rem;
  color: white;
  margin: 20px;
  text-align: justify;

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
  font-size: 2rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  background-color: rgb(0,142,188,255);
  color: #666;
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px rgb(0, 0, 0);
  max-width: 200px;
  width: 100%;
  margin-top: 20px;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: white;
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
