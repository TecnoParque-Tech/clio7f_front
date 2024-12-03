import React from 'react';
import styled from 'styled-components';

const Tool = () => {
  const data = Array.from({ length: 7 }, (_, rowIndex) => ({
    title: `Título ${rowIndex + 1}`,
    sections: Array.from({ length: 7 }, () =>
      Array.from({ length: 10 }, (_, questionIndex) => `Pregunta ${questionIndex + 1}`)
    ),
  }));

  return (
    <TableContainer>
      {data.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Title>{row.title}</Title>
          <Sections>
            {row.sections.map((questions, sectionIndex) => (
              <Section key={sectionIndex}>
                {questions.map((question, questionIndex) => (
                  <Question key={questionIndex}>{question}</Question>
                ))}
              </Section>
            ))}
          </Sections>
        </Row>
      ))}
    </TableContainer>
  );
};

export default Tool;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Sections = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Question = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;