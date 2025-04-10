// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada al backend para obtener la lista de archivos
    axios.get('http://localhost:8000/api/list-files/')
      .then(response => {
        setFiles(response.data.files);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar los archivos:", error);
        setLoading(false);
      });
  }, []);

  const handleDownloadAll = () => {
    window.open('http://localhost:8000/api/download-all/', '_blank');
  };

  return (
    <Container>
      <Title>Archivos Subidos</Title>

      <Button onClick={handleDownloadAll}>
        Descargar Consolidado
      </Button>

      {loading ? (
        <Message>Cargando archivos...</Message>
      ) : files.length === 0 ? (
        <Message>No hay archivos disponibles.</Message>
      ) : (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
            </FileItem>
          ))}
        </FileList>
      )}
    </Container>
  );
};

export default AdminDashboard;

// Estilos
const Container = styled.div`
  padding: 30px;
  text-align: center;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: rgb(0,142,188);
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: gray;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const FileItem = styled.li`
  margin: 10px 0;
  font-size: 1rem;

  a {
    text-decoration: none;
    color: #0077cc;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
  background-color: rgb(0,142,188);
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;

  &:hover {
    background-color: white;
    color: rgb(0,142,188);
    border: 1px solid rgb(0,142,188);
  }
`;
