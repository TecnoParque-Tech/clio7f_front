import { useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import * as XLSX from "xlsx";

const ExportButton = () => {
  const { responses } = useContext(SurveyContext);

  const sendDataToBackend = async () => {
    const companyNIT = localStorage.getItem("companyNIT") || "NIT no ingresado";
    const savedResponses = JSON.parse(localStorage.getItem("surveyResponses")) || {};

    // Combinar respuestas
    const dataToSend = {
      companyNIT,
      responses: { ...savedResponses, ...responses },
    };

    console.log("📤 Enviando datos al backend:", dataToSend); // Depuración en consola

    try {
      const response = await fetch("http://127.0.0.1:8000/api/save-survey/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("✅ Datos enviados correctamente");
        exportToExcel(); // Exportar después de enviar
      } else {
        console.error("❌ Error al enviar los datos");
      }
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
    }
  };

  const exportToExcel = () => {
    const companyNIT = localStorage.getItem("companyNIT") || "NIT no ingresado";
    const savedResponses = JSON.parse(localStorage.getItem("surveyResponses")) || {};

    const fieldTranslations = {
      firstName: "Nombres",
      lastName: "Apellidos",
      email: "Correo",
      phone: "Celular",
      birthDate: "Fecha de Nacimiento",
    };

    const data = [
      { Pregunta: "NIT de la Empresa", Respuesta: companyNIT },
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

    // Limpiar almacenamiento local después de la exportación
    localStorage.removeItem("surveyResponses");
    localStorage.removeItem("companyNIT");
  };

  return (
    <button
      style={{
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
      }}
      onClick={sendDataToBackend} // Enviar datos antes de exportar
    >
      Enviar y Exportar
    </button>
  );
};

export default ExportButton;
