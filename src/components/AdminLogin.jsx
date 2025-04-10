import React, { useState } from "react";
import styled from "styled-components";
import AdminDataView from "./AdminDataView";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setLoggedIn(true);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (loggedIn) {
    return <AdminDataView onLogout={handleLogout} />;
  }

  return (
    <Container>
      <Content>
        <Title>Acceso Administrador</Title>
        <Input
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Content>
      <Button onClick={handleLogin}>Ingresar</Button>
    </Container>
  );
};

export default AdminLogin;





const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: white;
  padding: 20px;

  @media (max-width: 768px) {
    height: auto;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Content = styled.div`
  background-color: rgb(0,142,188,255);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 30%;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
 font-size: 2.5rem;
  color: white;
  text-align: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? 'rgb(0,142,188,255)' : 'rgb(0,142,188,255)')};
  color: ${({ disabled }) => (disabled ? 'white' : 'white')};
  font-size: 1.25rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  max-width: 200px;
  width: 100%;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'white' : 'white')};
    color: ${({ disabled }) => (disabled ? 'gray' : 'gray')};
  }
`;

