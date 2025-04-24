import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { SurveyContext } from '../SurveyContext';

const PersonalInformation = () => {
  const { setResponses } = useContext(SurveyContext);
  const navigate = useNavigate();

  // Cargar datos previos de localStorage si existen
  const storedData = JSON.parse(localStorage.getItem('surveyResponses')) || {};

  const [formData, setFormData] = useState({
    email: storedData.email || '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm(formData));
  }, [formData]);

  const validateForm = (data) => {
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    setFormData(updatedForm);
    setIsFormValid(validateForm(updatedForm));

    // Guardar automáticamente en localStorage
    localStorage.setItem(
      'surveyResponses',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('surveyResponses') || '{}'),
        ...updatedForm,
      })
    );
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Guardar en el contexto global
    setResponses((prevResponses) => ({
      ...prevResponses,
      ...formData,
    }));

    navigate('/sociodemographic'); // Redirige a la siguiente sección
  };

  return (
    <FormContainer>
      <Content>
        <Tittle>Información Personal</Tittle>
        <form>
          <FormField>
            <Label htmlFor="email">Correo</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
        </form>
      </Content>
      
      <Button type="button" onClick={handleSubmit} disabled={!isFormValid}>
        Enviar
      </Button>
    </FormContainer>
  );
};

export default PersonalInformation;

// Estilos
const Tittle = styled.h1`
  font-size: 2.5rem;
  color: white;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  padding: 20px;
`;

const Content = styled.div`
  background-color: rgb(0,142,188,255);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  color: white;
  width: 100%;
  align-items: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? 'rgb(0,142,188,255)' : 'rgb(0,142,188,255)')};
  color: white;
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
`;
