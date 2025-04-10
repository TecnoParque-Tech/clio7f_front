import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const ExportAdmin = ({ onLogout }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "respuestas"));
    const allData = [];
    querySnapshot.forEach((doc) => {
      allData.push({ id: doc.id, ...doc.data() });
    });
    console.log("📦 Datos obtenidos de Firestore:", allData);
    setData(allData);
  };

  const exportToExcel = () => {
    const flatData = data.map(entry => {
      const { id, timestamp, companyNIT, responses } = entry;

      // Si no hay responses, mostrar advertencia
      if (!responses || typeof responses !== "object") {
        console.warn(`⚠️ Entrada sin responses válidas:`, entry);
        return {
          ID: id || "N/A",
          NIT: companyNIT || "N/A",
          Fecha: timestamp || "N/A",
          Advertencia: "No hay datos en responses",
        };
      }

      const {
        firstName = "N/A",
        lastName = "N/A",
        email = "N/A",
        phone = "N/A",
        birthDate = "N/A",
        ...restOfResponses
      } = responses;

      return {
        ID: id,
        Nombre: firstName,
        Apellido: lastName,
        Correo: email,
        Teléfono: phone,
        FechaNacimiento: birthDate,
        NIT: companyNIT || "N/A",
        Fecha: timestamp || "N/A",
        ...restOfResponses,
      };
    });

    console.log("🧾 Datos planos para exportar:", flatData);

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Respuestas Admin");
    XLSX.writeFile(workbook, "Respuestas_Admin.xlsx");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToDataView = () => {
    navigate("/admin-data");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Exportar todas las respuestas</h2>
      <button onClick={exportToExcel} style={{ marginRight: "10px" }}>
        Descargar Excel
      </button>

      <button onClick={goToDataView} style={{ marginRight: "10px" }}>
        Ver Datos Guardados
      </button>

      <button onClick={onLogout} style={{ background: "red", color: "white" }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default ExportAdmin;
