import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  

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
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerClick = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer
    });
  };

  return (
    <Container>
      <Content>
      <Tittle>Beneficios</Tittle>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={selectedAnswers[index] === answer}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
      </Content>
      <Button>
        <StyledLink to={'/acknowledgment'}>Siguiente</StyledLink>
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

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
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