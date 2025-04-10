// src/firebaseService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Cambia 'respuestas' por el nombre real de tu colección en Firestore
export const obtenerRespuestas = async () => {
  const respuestasRef = collection(db, "respuestas");
  const snapshot = await getDocs(respuestasRef);
  const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return datos;
};
