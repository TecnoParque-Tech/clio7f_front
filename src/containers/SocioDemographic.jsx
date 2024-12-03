import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  

const questions = [
  {
    question: "Indique su edad de acuerdo a los siguientes rangos",
    options: ["Entre 18 y 23 años", "Entre 24 y 30 años", "Entre 30 y 40 años", "Entre 40 y 50 años", "Mas de 50 años "],
    correctAnswer: 1
  },
  {
    question: "Genero:",
    options: ["Femenino", "Masculino", "Otro"],
    correctAnswer: 1
  },

  {
    question: "Estado Civil:",
    options: ["Soltero (a)", "Casado (a)", "Separado (a)", "Divorciado (a)", "Viudo (a)"],
    correctAnswer: 1
  },

  {
    question: "Ultimo Nivel de Escolaridad Terminado:",
    options: ["Primaria o Bachillerato sin terminar", "Bachillerato", "Técnico", "Tecnológico", "Profesional"],
    correctAnswer: 1
  },

  {
    question: "Indique  la empresa a la que pertenece:",
    isTextInput: true
  },

  {
    question: "Indique el area de trabajo a la que pertenece:",
    isTextInput: true
  },

  {
    question: "Nivel del cargo que desempeña:",
    options: ["Directivo", " Jefe de Área o Proceso (Personas con personal a cargo, incluyendo Coordinadores y Supervisores)", "Profesional", "Auxiliar (Administrativo o Técnico)", "Operativo (Operario, Ayudante, Servicios Generales)"],
    correctAnswer: 1
  },

  {
    question: "Indique el tiempo que lleva laborando en la empresa:",
    options: ["1 año o menos", "Mas de 1 año y menos de 5", "Mas de 5 años y hasta 10", "Mas de 10 años"],
    correctAnswer: 1
  },

  {
    question: "Tipo de contrato:",
    options: ["Fijo", "Indefinido", "Obra labor"],
    correctAnswer: 1
  },

  {
    question: "Modalidad de trabajo",
    options: ["Teletrabajo (formalizado contractualmente)", "Trabajo en casa", "Presencial", "Mixto (alterna entre trabajo en casa y presencialidad)"],
    correctAnswer: 1
  },
];


const Tool = () => {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleTextChange = (questionIndex, text) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = text;
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <Container>
      <Content>
      <Tittle>Datos Sociodemográficos</Tittle>
      {questions.map((question, questionIndex) => (
        <QuestionContainer key={questionIndex}>
          <QuestionTitle>{question.question}</QuestionTitle>
          {question.isTextInput ? (
            <TextInput
              type="text"
              value={selectedAnswers[questionIndex] || ""}
              onChange={(e) => handleTextChange(questionIndex, e.target.value)}
            />
          ) : (
            question.options.map((option, optionIndex) => (
              <OptionLabel key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={selectedAnswers[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {option}
              </OptionLabel>
            ))
          )}
        </QuestionContainer>
      ))}
      </Content>
      <Button>
        <StyledLink to={'/toolleader'}>Guardar</StyledLink>
        </Button>

    </Container>
  );
};

export default Tool;

const Tittle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
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

const Container = styled.div`
 display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(176, 216, 255);
  padding: 20px;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionTitle = styled.h3`
  margin-bottom: 10px;
`;

const OptionLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const TextInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  border-color: black;
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
  display: block;
  margin-left: auto;
  margin-right: auto;

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