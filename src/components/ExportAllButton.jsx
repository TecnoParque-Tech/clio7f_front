import React from 'react';
import * as XLSX from 'xlsx';

const ExportAllButton = () => {
  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8000/upload-excel/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Archivo subido con éxito ✅');
        console.log('URL del archivo:', data.url);
      })
      .catch((error) => {
        console.error('Error al subir archivo:', error);
        alert('Error al subir el archivo ❌');
      });
  };

  const handleExport = () => {
    const responses = JSON.parse(localStorage.getItem('formResponses')) || {};
    const ws = XLSX.utils.json_to_sheet([responses]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Respuestas');

    const excelBlob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
    const file = new File([excelBlob], 'Todas_Las_Respuestas.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    uploadFile(file);
  };

  return (
    <>
      <button onClick={handleExport} style={buttonStyle}>
        Exportar y Subir
      </button>
    </>
  );
};

const buttonStyle = {
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
};

export default ExportAllButton;
