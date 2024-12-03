import React from "react";
import styled from "styled-components";


function Navbar() {
  return (
    <>
      <NavContainer>
        <h1>
          Clio 7<span>F</span>
        </h1>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  margin: 10px;
  padding: .2rem;
  background-color: rgba(140, 196, 252);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 100);

  a {
    color: white;
    text-decoration: none;
    margin-right: 1rem;
    font-weight: bold;
  }

  h1 {
    color: white;
    font-weight: 50;
    font-size: 3rem;
    margin: 5px;
    span {
      font-weight: bold;
    }
  }

  .links {
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;

    a {
      color: white;
      font-size: 2rem;
      display: block;
    }

    @media (min-width: 768px) {
      position: initial;
      margin: 0;
      a {
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }

  .links.active {
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    a {
      color: white;
      font-size: 2rem;
      margin-top: 1rem;
    }
  }
`;
