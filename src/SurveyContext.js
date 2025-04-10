/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [responses, setResponses] = useState(() => {
    const storedResponses = localStorage.getItem("surveyResponses");
    return storedResponses ? JSON.parse(storedResponses) : {};
  });

  // Guardar respuestas en localStorage
  const saveAnswer = (questionId, answer) => {
    setResponses((prevResponses) => {
      const updatedResponses = { ...prevResponses, [questionId]: answer };
      const savedResponses = JSON.parse(localStorage.getItem("surveyResponses"));
      return updatedResponses;
    });
  };

  return (
    <SurveyContext.Provider value={{ responses, saveAnswer, setResponses }}>
      {children}
    </SurveyContext.Provider>
  );
};
