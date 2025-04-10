/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext';

const questions = [
  { text: 'Me gusta el trabajo que desempeño', answers: [1, 2, 3, 4, 5] },
  { text: 'Siento interés por mi trabajo', answers: [1, 2, 3, 4, 5] },
  { text: 'Me siento orgulloso de trabajar en esta empresa', answers: [1, 2, 3, 4, 5] },
  { text: 'Me siento satisfecho con el trabajo que tengo', answers: [1, 2, 3, 4, 5] },
  { text: 'Frecuentemente pienso en cambiar de empleo', answers: [1, 2, 3, 4, 5], inverse: true },
];

const InfoTool = () => {
  const { responses, saveAnswer, setResponses } = useContext(SurveyContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Cargar respuestas guardadas en localStorage al montar el componente
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    setResponses(savedResponses);
  }, []);

  // Guardar respuestas en localStorage cada vez que responses cambie
  useEffect(() => {
    localStorage.setItem('surveyResponses', JSON.stringify(responses));
  }, [responses]);

  const handleAnswerClick = (questionIndex, answer) => {
    const question = questions[questionIndex];
    const adjustedAnswer = question.inverse ? 6 - answer : answer;
    const questionKey = `Organizacion - ${question.text}`; // 🔹 Clave corregida con tilde

    saveAnswer(questionKey, adjustedAnswer);
    setError(''); // Limpiar mensaje de error si ya se respondió todo
  };

  const allQuestionsAnswered = questions.every(
    (question) => responses[`Organizacion - ${question.text}`] !== undefined
  );

  const handleNextClick = () => {
    console.log("Intentando navegar, respuestas actuales:", responses);
    
    if (!allQuestionsAnswered) {
      setError('⚠️ Responde todas las preguntas antes de continuar.');
    } else {
      console.log("Navegando a /ToolOrganization");
      navigate('/ToolComunication');
    }
  };

  return (
    <Container>
      <Content>
        <Title>Identificación con la organización</Title>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={responses[`Organizacion - ${question.text}`] === (question.inverse ? 6 - answer : answer)}
                  aria-pressed={responses[`Organizacion - ${question.text}`] === (question.inverse ? 6 - answer : answer)}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
        {error && <ErrorText>{error}</ErrorText>}
      </Content>
      <Button onClick={handleNextClick} disabled={!allQuestionsAnswered}>
        Siguiente
      </Button>
    </Container>
  );
};

// Función para obtener el texto de la respuesta
const getAnswerText = (answer) => {
  switch (answer) {
    case 1: return 'Muy en desacuerdo';
    case 2: return 'En desacuerdo';
    case 3: return 'Ni de acuerdo ni en desacuerdo';
    case 4: return 'De acuerdo';
    case 5: return 'Totalmente de acuerdo';
    default: return '';
  }
};

export default InfoTool;

// 🎨 Estilos con styled-components
const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  @media (max-width: 768px) { font-size: 2rem; }
  @media (max-width: 480px) { font-size: 1.5rem; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
  @media (max-width: 768px) { padding: 15px; }
  @media (max-width: 480px) { padding: 10px; }
`;

const Question = styled.div` 
margin-bottom: 20px; 
`;

const QuestionText = styled.h3` 
margin-bottom: 10px; 
color: white;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Answer = styled.button`
  background-color: ${({ selected }) => (selected ? 'gray' : 'rgb(255, 255, 255)')};
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  width: 30%;
  text-align: left;
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? 'rgb(0,142,188,255)' : 'rgb(0,142,188,255)')};
  color: ${({ disabled }) => (disabled ? 'white' : 'white')};
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 200px;
  width: 100%;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'white' : 'white')};
    color: ${({ disabled }) => (disabled ? 'gray' : 'gray')};
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;
