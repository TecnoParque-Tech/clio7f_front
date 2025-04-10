
import { useEffect, useState } from "react";

const AdminFileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:8000/list-excel-files/");
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Archivos Excel Subidos</h2>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos aún.</p>
      ) : (
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminFileList;
