import React from "react";
import { Helmet } from "react-helmet";
import {
  ButtonContainer,
  Header,
  HeaderContainer,
  Title,
} from "./elements/Header";
import Button from "./elements/Button";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar gasto</title>
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Agregar gasto</Title>
          <ButtonContainer>
            <Button to="/gastos-categoria">Categorías</Button>
            <Button to="/lista-gastos">Lista de gastos</Button>
            <Button>X</Button>
          </ButtonContainer>
        </HeaderContainer>
      </Header>
    </>
  );
};

export default App;
