# Clio7F - Evaluación del Clima Organizacional

Este proyecto es una aplicación desarrollada en **React** que permite evaluar el clima organizacional de una empresa a través de formularios segmentados y exportación de resultados a Excel.

## 🚀 Funcionalidades principales

- Formulario de evaluación dividido por secciones (Ambiente, Líder, Equipo, etc.).
- Exportación de resultados a archivos Excel (.xlsx) con estilos personalizados.
- Visualización de datos por empresa y descarga individual.
- Almacenamiento de datos en Firebase (Firestore y Storage).
- Panel de administración para ver y descargar reportes.

## 🛠 Tecnologías utilizadas

- React
- Firebase (Firestore & Storage)
- ExcelJS
- Styled-components
- React Router
- Axios
- File-saver
- Xlsx

## 📦 Instalación

1. Clona el repositorio:
   
git clone: https://github.com/TecnoParque-Tech/clio7f_front.git

3. Entra al directorio del proyecto:

cd tu-repo

3. Instala las dependencias necesarias:

npm start

🔐 Configuración
Recuerda crear tu archivo firebaseConfig.js con tu configuración de Firebase y ubicarlo en la carpeta correspondiente del proyecto.

// firebaseConfig.js (ejemplo)
export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

