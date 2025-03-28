import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext';

const questions = [
  {
    text: 'Conozco los beneficios que me ofrece mi empresa',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Me siento satisfecho con los beneficios que me ofrece mi empresa',
    answers: [1, 2, 3, 4, 5]
  }
];

const InfoTool = () => {
  const { responses, saveAnswer } = useContext(SurveyContext);

  // Cargar respuestas almacenadas en localStorage al iniciar el componente
  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    Object.entries(storedResponses).forEach(([key, value]) => saveAnswer(key, value));
  }, [saveAnswer]);

  const handleAnswerClick = (questionIndex, answer) => {
    const questionKey = `Beneficios - ${questions[questionIndex].text}`;
    const updatedResponses = { ...responses, [questionKey]: answer };

    saveAnswer(questionKey, answer);
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses)); // Guardar en localStorage
  };

  // Verifica si todas las preguntas han sido respondidas
  const allAnswered = questions.every(
    (question) => responses[`Beneficios - ${question.text}`] !== undefined
  );

  return (
    <Container>
      <Content>
        <Title>Beneficios</Title>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer) => (
                <Answer
                  key={answer}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={responses[`Beneficios - ${question.text}`] === answer}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
      </Content>
      <Button disabled={!allAnswered}>
        <StyledLink to={allAnswered ? '/acknowledgment' : '#'}>Enviar</StyledLink>
      </Button>
    </Container>
  );
};

const getAnswerText = (answer) => {
  const labels = [
    'Muy en desacuerdo',
    'En desacuerdo',
    'Ni de acuerdo ni en desacuerdo',
    'De acuerdo',
    'Totalmente de acuerdo'
  ];
  return labels[answer - 1] || '';
};

export default InfoTool;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(176, 216, 255);
  padding: 20px;
`;

const Content = styled.div`
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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  pointer-events: ${({ to }) => (to === '#' ? 'none' : 'auto')};
`;
