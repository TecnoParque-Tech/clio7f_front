import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  
import { SurveyContext } from '../SurveyContext';

const questions = [
  { question: "Indique su edad de acuerdo a los siguientes rangos", options: ["Entre 18 y 23 años", "Entre 24 y 30 años", "Entre 30 y 40 años", "Entre 40 y 50 años", "Más de 50 años"] },
  { question: "Género:", options: ["Femenino", "Masculino", "Otro"] },
  { question: "Estado Civil:", options: ["Soltero(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viudo(a)"] },
  { question: "Último Nivel de Escolaridad Terminado:", options: ["Primaria o Bachillerato sin terminar", "Bachillerato", "Técnico", "Tecnológico", "Profesional"] },
  { question: "Indique la empresa a la que pertenece:", isTextInput: true },
  { question: "Indique el área de trabajo a la que pertenece:", isTextInput: true },
  { question: "Nivel del cargo que desempeña:", options: ["Directivo", "Jefe de Área o Proceso", "Profesional", "Auxiliar", "Operativo"] },
  { question: "Indique el tiempo que lleva laborando en la empresa:", options: ["1 año o menos", "Más de 1 año y menos de 5", "Más de 5 años y hasta 10", "Más de 10 años"] },
  { question: "Tipo de contrato:", options: ["Fijo", "Indefinido", "Obra labor"] },
  { question: "Modalidad de trabajo", options: ["Teletrabajo", "Trabajo en casa", "Presencial", "Mixto"] }
];

const SocioDemographic = () => {
  const { responses, saveAnswer } = useContext(SurveyContext);
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    return questions.map((q) => responses[q.question] || null);
  });

  useEffect(() => {
    setSelectedAnswers(questions.map((q) => responses[q.question] || null));
  }, [responses]);

  const handleOptionChange = (questionIndex, option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = option;
    setSelectedAnswers(updatedAnswers);
    saveAnswer(questions[questionIndex].question, option);
  };

  const handleTextChange = (questionIndex, text) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = text;
    setSelectedAnswers(updatedAnswers);
    saveAnswer(questions[questionIndex].question, text);
  };

  // Verifica si todas las preguntas han sido respondidas
  const allAnswered = selectedAnswers.every((answer) => answer !== null && answer !== "");

  return (
    <Container>
      <Content>
        <Title>Datos Sociodemográficos</Title>
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
                    value={option}
                    checked={selectedAnswers[questionIndex] === option}
                    onChange={() => handleOptionChange(questionIndex, option)}
                  />
                  {option}
                </OptionLabel>
              ))
            )}
          </QuestionContainer>
        ))}
      </Content>
      <Button disabled={!allAnswered}>
        <StyledLink to={allAnswered ? '/toolleader' : '#'}>Guardar</StyledLink>
      </Button>
    </Container>
  );
};

export default SocioDemographic;

// ------------- ESTILOS ----------------

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) { font-size: 2rem; }
  @media (max-width: 480px) { font-size: 1.5rem; }
`;

const Content = styled.div`
  text-align: justify;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) { padding: 15px; }
  @media (max-width: 480px) { padding: 10px; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  border: 1px solid black;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'white')};
  color: ${({ disabled }) => (disabled ? '#888' : '#666')};
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  margin-top: 20px;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : 'gray')};
    color: ${({ disabled }) => (disabled ? '#888' : 'white')};
  }

  @media (max-width: 768px) { font-size: 1rem; }
  @media (max-width: 480px) { font-size: 0.875rem; }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  pointer-events: ${({ to }) => (to === '#' ? 'none' : 'auto')};
`;
