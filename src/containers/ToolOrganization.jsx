import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext'; // Importamos el contexto

const questions = [
  {
    text: 'Me gusta el trabajo que desempeño',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Siento interés por mi trabajo',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Me siento orgulloso de trabajar en esta empresa',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Me siento satisfecho con el trabajo que tengo',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Frecuentemente pienso en cambiar de empleo',
    answers: [1, 2, 3, 4, 5],
    inverse: true, // Indica que la respuesta debe ser invertida
  }
];

const InfoTool = () => {
  const { responses, saveAnswer } = useContext(SurveyContext);
  const navigate = useNavigate(); // Para redirigir

  const handleAnswerClick = (questionIndex, answer) => {
    const question = questions[questionIndex];

    // Si la pregunta es inversa, ajustamos la respuesta
    const adjustedAnswer = question.inverse ? 6 - answer : answer;

    saveAnswer(`Organizacion - ${question.text}`, adjustedAnswer);
  };

  // Verificar si todas las preguntas han sido respondidas
  const allQuestionsAnswered = questions.every(
    (question) => responses[`Organizacion - ${question.text}`] !== undefined
  );

  // Manejar clic en "Siguiente"
  const handleNextClick = () => {
    if (!allQuestionsAnswered) {
      alert('Responde todas las preguntas');
    } else {
      navigate('/ToolComunication');
    }
  };

  return (
    <Container>
      <Content>
        <Tittle>Identificación con la organización</Tittle>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={responses[`Organizacion - ${question.text}`] === (question.inverse ? 6 - answer : answer)}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
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

// Estilos
const Tittle = styled.h1`
  font-size: 2.5rem;
  color: #333;
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

  @media (max-width: 768px) { padding: 15px; }
  @media (max-width: 480px) { padding: 10px; }
`;

const Question = styled.div` margin-bottom: 20px; `;
const QuestionText = styled.h3` margin-bottom: 10px; `;

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
  max-width: 200px;
  width: 100%;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : 'gray')};
    color: ${({ disabled }) => (disabled ? '#888' : 'white')};
  }
`;
