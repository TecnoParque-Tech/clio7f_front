import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext'; // Importamos el contexto

const questions = [
  {
    text: 'Mi salario es atractivo si lo comparo con cargos similares de otras empresas.',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Mi salario es inferior si lo comparo con cargos similares de otras empresas.',
    answers: [1, 2, 3, 4, 5],
    inverse: true,
  },
  {
    text: 'El salario que recibo es acorde al trabajo que realizo.',
    answers: [1, 2, 3, 4, 5]
  }
];

const InfoTool = () => {
  const { responses, saveAnswer } = useContext(SurveyContext);
  const navigate = useNavigate();

  // Cargar respuestas previas desde localStorage
  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    Object.keys(storedResponses).forEach((key) => saveAnswer(key, storedResponses[key]));
  }, [saveAnswer]);

  const handleAnswerClick = (questionIndex, answer) => {
    const question = questions[questionIndex];

    // Si la pregunta tiene el campo "inverse", invertir la respuesta
    const adjustedAnswer = question.inverse ? 6 - answer : answer;
    const questionKey = `Compensación - ${question.text}`;

    // Guardar en el contexto y en localStorage
    saveAnswer(questionKey, adjustedAnswer);
    const updatedResponses = { ...responses, [questionKey]: adjustedAnswer };
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));
  };

  const isFormComplete = questions.every(
    (question) => responses[`Compensación - ${question.text}`] !== undefined
  );

  const handleNextClick = () => {
    if (!isFormComplete) {
      alert("Responde todas las preguntas");
      return;
    }
    navigate('/ToolBenefits');
  };

  return (
    <Container>
      <Content>
        <Title>Compensación</Title>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => {
                const storedAnswer = responses[`Compensación - ${question.text}`];
                const isSelected = storedAnswer === (question.inverse ? 6 - answer : answer);

                return (
                  <Answer
                    key={idx}
                    onClick={() => handleAnswerClick(index, answer)}
                    selected={isSelected}
                  >
                    {answer} - {getAnswerText(answer)}
                  </Answer>
                );
              })}
            </Answers>
          </Question>
        ))}
      </Content>
      <Button onClick={handleNextClick} disabled={!isFormComplete}>
        Siguiente
      </Button>
    </Container>
  );
};

const getAnswerText = (answer) => {
  switch (answer) {
    case 1:
      return 'Muy en desacuerdo';
    case 2:
      return 'En desacuerdo';
    case 3:
      return 'Ni de acuerdo ni en desacuerdo';
    case 4:
      return 'De acuerdo';
    case 5:
      return 'Totalmente de acuerdo';
    default:
      return '';
  }
};

export default InfoTool;

// Estilos
const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
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

const Content = styled.div`
  text-align: justify;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 800px;
  width: 100%;
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const QuestionText = styled.h3`
  margin-bottom: 10px;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Answer = styled.button`
  background-color: ${({ selected }) => (selected ? 'gray' : 'rgb(193, 193, 193)')};
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
  background-color: ${({ disabled }) => (disabled ? 'gray' : 'white')};
  color: ${({ disabled }) => (disabled ? '#999' : '#666')};
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
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'gray')};
    color: ${({ disabled }) => (disabled ? '#999' : 'white')};
  }
`;
