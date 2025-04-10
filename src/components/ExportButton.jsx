import { useContext } from "react";
import { SurveyContext } from "../SurveyContext";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ExportButton = () => {
  const { responses } = useContext(SurveyContext);

  const sendDataToBackend = async () => {
    const companyNIT = localStorage.getItem("companyNIT") || "NIT no ingresado";
    const savedResponses = JSON.parse(localStorage.getItem("surveyResponses")) || responses;
    const socioDemographic = JSON.parse(localStorage.getItem("socioDemographicResponses")) || {};
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

    const combinedResponses = {
      ...userInfo,
      ...socioDemographic,
      ...savedResponses,
    };

    if (!combinedResponses || Object.keys(combinedResponses).length === 0) {
      alert("No hay respuestas para exportar. Asegúrate de completar la encuesta.");
      return;
    }

    const userId = combinedResponses.email || `persona-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const newEntry = {
      id: userId,
      companyNIT,
      timestamp,
      responses: combinedResponses,
    };

    try {
      // 🔹 Guardar en Firestore
      await addDoc(collection(db, "respuestas"), newEntry);
      console.log("✅ Datos guardados en Firestore correctamente");

      // 🔹 Limpiar localStorage
      localStorage.removeItem("surveyResponses");
      localStorage.removeItem("socioDemographicResponses");
      localStorage.removeItem("companyNIT");
      localStorage.removeItem("userInfo");

      alert("Respuestas enviadas con éxito ✅");

    } catch (error) {
      console.error("Error al guardar los datos:", error);
      alert("Error inesperado al guardar los datos ❌");
    }
  };

  return (
    <button
      onClick={sendDataToBackend}
      style={{
        backgroundColor: "rgb(0,142,188,255)",
        color: "white",
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
    >
      Enviar
    </button>
  );
};

export default ExportButton;
