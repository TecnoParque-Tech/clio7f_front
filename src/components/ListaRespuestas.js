// src/components/ListaRespuestas.js
import { useEffect, useState } from "react";
import { obtenerRespuestas } from "../firebaseService";

const ListaRespuestas = () => {
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerRespuestas();
      setRespuestas(data);
    };

    cargarDatos();
  }, []);

  return (
    <div>
      <h2>Respuestas guardadas</h2>
      <ul>
        {respuestas.map((respuesta, index) => (
          <li key={index}>
            <strong>{respuesta.id}</strong>: {JSON.stringify(respuesta.responses)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaRespuestas;
