import { useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import * as XLSX from "xlsx";

const ExportButton = () => {
  const { responses } = useContext(SurveyContext);

  const exportToExcel = async () => {
    const companyNIT = localStorage.getItem("companyNIT") || "NIT no ingresado";
    const savedResponses = JSON.parse(localStorage.getItem("surveyResponses")) || {};
    const userName = `${savedResponses.firstName || "Desconocido"}_${savedResponses.lastName || "Usuario"}`;

    // Mapeo de claves en inglés a español
    const translatedResponses = {
      "Nombres": savedResponses.firstName || "No ingresado",
      "Apellidos": savedResponses.lastName || "No ingresado",
      "Correo": savedResponses.email || "No ingresado",
      "Celular": savedResponses.phone || "No ingresado",
      "Fecha de Nacimiento": savedResponses.birthDate || "No ingresado",
    };

    // Datos estructurados
    const data = [
      ["Pregunta", "Respuesta"],
      ["NIT de la Empresa", companyNIT], 
      ["", ""],
      ...Object.entries(translatedResponses),
      ["", ""],
      ...Object.entries(responses),
    ];

    // Crear hoja de Excel
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Respuestas");

    // Convertir a Blob (Formato adecuado para enviar a backend)
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Crear FormData para enviar el archivo
    const formData = new FormData();
    formData.append("file", fileBlob, `${userName}.xlsx`);
    formData.append("name", userName); // Enviar nombre asociado

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Archivo enviado con éxito.");
      } else {
        console.error("Error al enviar el archivo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    XLSX.writeFile(workbook, `${userName}.xlsx`);

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
