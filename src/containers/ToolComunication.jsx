import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext';

const questions = [
  { text: 'La organización cumple los compromisos que asume con los empleados', answers: [1, 2, 3, 4, 5] },
  { text: 'Las personas en esta organización cumplen con sus responsabilidades', answers: [1, 2, 3, 4, 5] },
  { text: 'Me identifico con las metas de la organización', answers: [1, 2, 3, 4, 5] },
  { text: 'La organización me ha dado a conocer las normas y reglamentos institucionales', answers: [1, 2, 3, 4, 5] },
  { text: 'Recibo la información necesaria para el desarrollo de mis labores', answers: [1, 2, 3, 4, 5] },
  { text: 'Tengo claridad respecto a los resultados que se esperan de mi trabajo', answers: [1, 2, 3, 4, 5] },
  { text: 'Se me han comunicado mis funciones y responsabilidades de manera clara', answers: [1, 2, 3, 4, 5] },
  { text: 'Los comportamientos de los empleados reflejan los valores de la organización', answers: [1, 2, 3, 4, 5] },
  { text: 'La organización comunica a los empleados las dificultades que se presentan', answers: [1, 2, 3, 4, 5] },
  { text: 'En la organización toman en cuenta las ideas y sugerencias de los empleados', answers: [1, 2, 3, 4, 5] }
];

const InfoTool = () => {
  const { responses, saveAnswer } = useContext(SurveyContext);
  const navigate = useNavigate();

  // Cargar respuestas desde localStorage al iniciar
  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('surveyResponses')) || {};
    Object.keys(storedResponses).forEach(key => saveAnswer(key, storedResponses[key]));
  }, [saveAnswer]);

  const handleAnswerClick = (questionIndex, answer) => {
    const questionKey = `Comunicacion - ${questions[questionIndex].text}`;
    saveAnswer(questionKey, answer);

    // Guardar en localStorage
    const updatedResponses = { ...responses, [questionKey]: answer };
    localStorage.setItem('surveyResponses', JSON.stringify(updatedResponses));
  };

  const isFormComplete = questions.every(
    (question) => responses[`Comunicacion - ${question.text}`] !== undefined
  );

  const handleNextClick = () => {
    if (!isFormComplete) {
      alert("Responde todas las preguntas");
      return;
    }
    navigate('/ToolEnvironment');
  };

  return (
    <Container>
      <Content>
        <Title>Claridad y comunicación</Title>
        {questions.map((question, index) => (
          <Question key={index}>
            <QuestionText>{question.text}</QuestionText>
            <Answers>
              {question.answers.map((answer, idx) => (
                <Answer
                  key={idx}
                  onClick={() => handleAnswerClick(index, answer)}
                  selected={responses[`Comunicacion - ${question.text}`] === answer}
                >
                  {answer} - {getAnswerText(answer)}
                </Answer>
              ))}
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

  @media (max-width: 768px) { font-size: 1rem; padding: 8px 15px; }
  @media (max-width: 480px) { font-size: 0.875rem; padding: 5px 10px; }
`;
