import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext'; // Importamos el contexto

const questions = [
  {
    text: 'Me siento satisfecho con el acompañamiento de mi líder para el desarrollo de mi trabajo',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Recibo orientación por parte de mi líder respecto a mi trabajo',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Recibo realimentación oportuna por parte de mi líder respecto a mi desempeño',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Recibo un trato respetuoso por parte de mi líder',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Recibo un trato justo por parte de mi líder',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Mi líder me agradece por el trabajo que hago.',
    answers: [1, 2, 3, 4, 5]
  },
  {
    text: 'Mi líder reconoce mis aportes y contribuciones en el trabajo',
    answers: [1, 2, 3, 4, 5]
  }
];

const InfoTool = () => {
  const navigate = useNavigate();
  const { responses, saveAnswer } = useContext(SurveyContext);

  const handleAnswerClick = (questionIndex, answer) => {
    saveAnswer(`Líder - ${questions[questionIndex].text}`, answer);
  };

  const handleNext = () => {
    // Verificar si todas las preguntas han sido respondidas
    const allAnswered = questions.every(q => responses[`Líder - ${q.text}`] !== undefined);

    if (!allAnswered) {
      alert("Responde todas las preguntas");
      return;
    }

    navigate('/ToolTeam'); // Navegar a la siguiente sección
    window.scrollTo(0, 0); // Volver al inicio de la página
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
                  selected={responses[`Líder - ${question.text}`] === answer}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
            </Answers>
          </Question>
        ))}
      </Content>
      <Button onClick={handleNext} disabled={!questions.every(q => responses[`Líder - ${q.text}`] !== undefined)}>
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
  background-color: ${({ disabled }) => (disabled ? 'lightgray' : 'white')};
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
    background-color: ${({ disabled }) => (disabled ? 'lightgray' : 'gray')};
    color: white;
  }
`;
