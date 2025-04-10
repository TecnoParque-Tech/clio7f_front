import React, { useState } from 'react';
import axios from 'axios';

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [empresa, setEmpresa] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !empresa) {
      alert("Debes seleccionar un archivo y escribir el nombre de la empresa");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("empresa", empresa);

    try {
      const response = await axios.post("http://localhost:8000/api/upload_excel/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Archivo subido exitosamente: " + response.data.filename);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      alert("Error al subir el archivo");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Subir archivo Excel</h2>
      <input
        type="text"
        placeholder="Nombre de la empresa"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Subir
      </button>
    </div>
  );
};

export default UploadExcel;
