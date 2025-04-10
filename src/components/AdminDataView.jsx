
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const AdminDataView = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "respuestas"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRespuestas(data);
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRespuestas();
  }, []);


  const exportDataToExcel = async (data, emailFilter = null) => {
    const filteredData = emailFilter
      ? data.filter(entry => entry.responses?.email === emailFilter)
      : data;
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Resultados');
  
    // Colores por sección
    const sectionColors = {
      Ambiente: 'E2EFDA',
      Líder: 'DDEBF7',
      Equipo: 'FFF2CC',
      Organización: 'FCE4D6',
      Comunicacion: 'E4DFEC',
      Compensación: 'F8CBAD',
      Beneficios: 'D9E1F2'
    };
  
    // Mapeo de campos sociodemográficos
    const demographicMapping = {
      companyNIT: "NIT de la empresa",
      firstName: "Nombres",
      lastName: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono",
      birthDate: "Fecha de nacimiento",
      "Género:": "Género",
      "Estado Civil:": "Estado civil",
      "Indique su edad de acuerdo a los siguientes rangos": "Rango de edad",
      "Indique el tiempo que lleva laborando en la empresa:": "Antigüedad en la empresa",
      "Indique el área de trabajo a la que pertenece:": "Área de trabajo",
      "Indique la empresa a la que pertenece:": "Empresa",
      "Modalidad de trabajo": "Modalidad de trabajo",
      "Nivel del cargo que desempeña:": "Nivel del cargo",
      "Tipo de contrato:": "Tipo de contrato",
      "Último Nivel de Escolaridad Terminado:": "Nivel de escolaridad",
    };
  
    const sectionOrder = [
      'Ambiente',
      'Líder',
      'Equipo',
      'Organizacion',
      'Comunicacion',
      'Compensación',
      'Beneficios'
    ];
  
    // Construcción de encabezados únicos
    const headersSet = new Set();
    const sociodemographicKeys = Object.keys(demographicMapping);
  
    filteredData.forEach(entry => {
      sociodemographicKeys.forEach(key => {
        if (entry[key] || entry.responses?.[key]) headersSet.add(key);
      });
  
      const responses = entry.responses || {};
      Object.keys(responses).forEach(key => {
        const section = sectionOrder.find(sec => key.startsWith(sec));
        if (section) headersSet.add(key);
      });
    });
  
    // Ordenar encabezados
    const headers = [
      ...sociodemographicKeys,
      ...sectionOrder.flatMap(section => {
        return Array.from(headersSet).filter(h => h.startsWith(section));
      })
    ];
  
    // Agregar columna de promedio por sección
    const sectionAverages = sectionOrder.map(section => `Promedio - ${section}`);
    const fullHeaders = [...headers, ...sectionAverages];
  
    // Agregar encabezados
    worksheet.addRow(fullHeaders.map(h => demographicMapping[h] || h)).eachCell(cell => {
      cell.font = { bold: true };
    });
  
    // Aplicar colores
    fullHeaders.forEach((header, index) => {
      const section = sectionOrder.find(sec => header.startsWith(sec) || header.includes(sec));
      if (section && sectionColors[section]) {
        worksheet.getCell(1, index + 1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: sectionColors[section] }
        };
      }
    });
  
    // Agregar datos
    filteredData.forEach(entry => {
      const row = [];
      headers.forEach(key => {
        if (sociodemographicKeys.includes(key)) {
          row.push(entry[key] ?? entry.responses?.[key] ?? '');
        } else {
          row.push(entry.responses?.[key] ?? '');
        }
      });
  
      // Calcular promedios
      sectionOrder.forEach(section => {
        const values = headers.filter(h => h.startsWith(section))
          .map(k => entry.responses?.[k])
          .filter(v => typeof v === 'number');
        const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : '';
        row.push(avg);
      });
  
      worksheet.addRow(row);
    });
  
    const fileName = emailFilter
      ? `Resultados_${emailFilter.replace(/[@.]/g, '_')}.xlsx`
      : 'Resultados_Encuesta.xlsx';
  
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), fileName);
  };
  

  return (
    <Container>
      <Title>Respuestas Guardadas</Title>
      <Button onClick={() => exportDataToExcel(respuestas)}>Exportar Tabla</Button>


      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <Table>
        <thead>
          <tr>
            <th>NIT</th>
            <th>Correo electrónico</th>
            <th>Acciones</th> {/* Nueva columna para el botón */}
          </tr>
        </thead>
        <tbody>
          {respuestas.map((respuesta, index) => {
            const {
              companyNIT,
              responses = {}
            } = respuesta;
      
            const { email } = responses;
      
            return (
              <tr key={index}>
                <td>{companyNIT || "N/A"}</td>
                <td>{email || "N/A"}</td>
                <td>
                  {email && (
                    <SmallButton onClick={() => exportDataToExcel(respuestas, email)}>
                      Descargar Excel
                    </SmallButton>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
      

      )}
    </Container>
  );
};

export default AdminDataView;

// Estilos
const Container = styled.div`
  padding: 30px;
  background:white;
`;

const Button = styled.button`
  background: rgb(0,142,188,255);
  color: white;
  font-size: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: white;
    color: rgb(0,142,188,255);
    border: 1px solid rgb(0,142,188,255);
  }
`;

const Title = styled.h2`
  color: rgb(0,142,188,255);
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
 

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  th {
    background: rgb(0,142,188,255);
    color: white;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 300px;
  }
`;

const SmallButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? 'rgb(0,142,188,255)' : 'rgb(0,142,188,255)')};
  color: ${({ disabled }) => (disabled ? 'white' : 'white')};
  font-size: 0.8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  padding: 5px 10px;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'white')};
    color: ${({ disabled }) => (disabled ? 'gray' : 'gray')};
  }
`;
