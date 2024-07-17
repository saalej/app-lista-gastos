import React from "react";
import { Helmet } from "react-helmet";
import { Header, HeaderContainer, Title } from "./../elements/Header";
import Button from "../elements/Button";
import { ButtonContainer, Input, Form } from "./../elements/FormElements";
import { ReactComponent as SvgLogin } from "./../images/login.svg";
import styled from "styled-components";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem; /* 20px */
`;

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>{" "}
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Iniciar sesión</Title>
          <div>
            <Button to="/registrar-usuario">Regristrarse</Button>
          </div>
        </HeaderContainer>
      </Header>

      <Form>
        <Svg></Svg>
        <Input type="email" name="email" placeholder="Email"></Input>
        <Input type="password" name="password" placeholder="Contraseña"></Input>
        <ButtonContainer>
          <Button as="button" primario="true">
            Iniciar sesión
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default Login;
