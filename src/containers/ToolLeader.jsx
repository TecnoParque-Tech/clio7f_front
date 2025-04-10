/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext'; // Importamos el contexto

const questions = [
  { text: 'Me siento satisfecho con el acompañamiento de mi líder para el desarrollo de mi trabajo', answers: [1, 2, 3, 4, 5] },
  { text: 'Recibo orientación por parte de mi líder respecto a mi trabajo', answers: [1, 2, 3, 4, 5] },
  { text: 'Recibo realimentación oportuna por parte de mi líder respecto a mi desempeño', answers: [1, 2, 3, 4, 5] },
  { text: 'Recibo un trato respetuoso por parte de mi líder', answers: [1, 2, 3, 4, 5] },
  { text: 'Recibo un trato justo por parte de mi líder', answers: [1, 2, 3, 4, 5] },
  { text: 'Mi líder me agradece por el trabajo que hago.', answers: [1, 2, 3, 4, 5] },
  { text: 'Mi líder reconoce mis aportes y contribuciones en el trabajo', answers: [1, 2, 3, 4, 5] }
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
    const questionKey = `Líder - ${question.text}`; // 🔹 Clave corregida con tilde

    saveAnswer(questionKey, adjustedAnswer);
    setError(''); // Limpiar mensaje de error si ya se respondió todo
  };

  const allQuestionsAnswered = questions.every(
    (question) => responses[`Líder - ${question.text}`] !== undefined
  );

  const handleNextClick = () => {
    console.log("Intentando navegar, respuestas actuales:", responses);
    
    if (!allQuestionsAnswered) {
      setError('⚠️ Responde todas las preguntas antes de continuar.');
    } else {
      console.log("Navegando a /ToolOrganization");
      navigate('/ToolTeam');
    }
  };

  return (
    <Container>
      <Content>
        <Title>Relacionamiento con el líder</Title>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={responses[`Líder - ${question.text}`] === answer} // 🔹 Clave corregida
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
  color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 800px;
  width: 100%;
`;

const Question = styled.div` margin-bottom: 20px; `;
const QuestionText = styled.h3` margin-bottom: 10px; `;

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
  --primary-color: rgb(0,142,188);
  --disabled-color: gray;
  --text-color: white;

  background-color: ${({ disabled }) => (disabled ? 'white' : 'var(--primary-color)')};
  color: ${({ disabled }) => (disabled ? 'var(--primary-color)' : 'var(--text-color)')};
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s, color 0.3s, opacity 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 200px;
  width: 100%;
  margin-top: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)}; /* Hace que el botón parezca desactivado */

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'white' : 'white')};
    color: ${({ disabled }) => (disabled ? 'var(--primary-color)' : 'var(--disabled-color)')};
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;
