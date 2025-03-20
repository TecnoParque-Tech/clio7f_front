/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import * as XLSX from "xlsx";

const ExportButton = () => {
  const { responses } = useContext(SurveyContext);

  const exportToExcel = () => {
    const companyNIT = localStorage.getItem("companyNIT") || "NIT no ingresado"; // Recupera el NIT
    const savedResponses = JSON.parse(localStorage.getItem("surveyResponses")) || {};

    // Mapeo de claves en inglés a español
    const fieldTranslations = {
      firstName: "Nombres",
      lastName: "Apellidos",
      email: "Correo",
      phone: "Celular",
      birthDate: "Fecha de Nacimiento",
    };

    // Combinar respuestas de la encuesta y datos personales con traducción
    const data = [
      { Pregunta: "NIT de la Empresa", Respuesta: companyNIT }, // Agregar NIT como primera fila
      ...Object.keys(savedResponses).map((key) => ({
        Pregunta: fieldTranslations[key] || key,
        Respuesta: savedResponses[key] || "No ingresado",
      })),
      ...Object.keys(responses).map((key) => ({
        Pregunta: key,
        Respuesta: responses[key],
      })),
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Respuestas");

    XLSX.writeFile(workbook, "Respuestas_Clima_Organizacional.xlsx");

    // Limpiar localStorage después de exportar
    localStorage.removeItem("surveyResponses");
    localStorage.removeItem("companyNIT");
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "#666",
    fontSize: "1.25rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 0 10px rgba(0, 0, 0, 1)",
    maxWidth: "200px",
    width: "100%",
    marginTop: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return <button style={buttonStyle} onClick={exportToExcel}>Enviar y Exportar</button>;
};

export default ExportButton;
