import React from 'react';
import styled from 'styled-components';

const ListConsent = () => {
  return(
    <Container>
      <InfoList>
        <ul>
          <li>Esta evaluación forma parte de las actividades de Gestión de Desarrollo Humano de la empresa, 
            y se orienta al mejoramiento del bienestar y la calidad de vida en la organización.</li>
            <li>
            La evaluación consiste en la aplicación de un cuestionario donde se realizarán algunas preguntas sobre su percepción de las condiciones del trabajo al interior de la empresa. 
            </li>
            <li>
            La información recolectada a través de este instrumento ayudará a la organización a tomar decisiones sobre acciones de intervención y mejoramiento. 
              </li>
              <li>
              La información recolectada es de carácter confidencial y es sometida a reserva informe con lo establecido en la ley 1090 de 2006, esta información será conocida por las personas requeridas para la identificación, análisis e intervención, quienes harán uso responsable de la información de acuerdo a la normatividad vigente. Cabe aclarar que los datos serán tratados a nivel general y en ningún caso, se dará a conocer respuestas individuales ni identidad del participante
              </li>
              <li>
              De acuerdo a la resolución 8430 de 1993 este procedimiento es categorizado como un procedimiento sin riesgo alguno para las condiciones biologicas, fisiológicas, psicológicas o sociales de los participantes en la evaluación.
              </li>
          </ul>
      </InfoList>
    </Container>
  );
};

export default ListConsent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: rgb(176, 216, 255);
  padding: 20px;

  @media (max-width: 768px) {
    height: auto;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const InfoList = styled.div` 
  font-size: 1.25rem;
  text-align: justify;
  color: #666;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  border-radius: 20px;
  padding: 20px;
  margin: 20px;
  width: 80%;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px;
    padding: 15px;
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin: 10px;
    padding: 10px;
    width: 100%;
  }
`;