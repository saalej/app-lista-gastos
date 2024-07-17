import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, HeaderContainer, Title } from "./../elements/Header";
import Button from "../elements/Button";
import { ButtonContainer, Input, Form } from "./../elements/FormElements";
import { ReactComponent as SvgLogin } from "./../images/registro.svg";
import styled from "styled-components";
import { auth } from "./../firebase/configFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem; /* 100px */
  margin-bottom: 1.25rem; /* 20px */
`;

const RegisterUsers = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;

      case "repeatPassword":
        setRepeatPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();

    const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if (email === "" || password === "" || repeatPassword === "") {
      console.log("Favor de llenar todos los datos");
      return;
    }

    if (!regex.test(email)) {
      console.log("Correo electronico invalido");
      return;
    }

    if (password !== repeatPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado exitosamente!");
      navigate("/");
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/invalid-password":
          message = "La contraseña tiene que ser de al menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          message =
            "Ya existe una cuenta con el correo electrónico proporcionado.";
          break;
        case "auth/invalid-email":
          message = "El correo electrónico no es válido.";
          break;
        default:
          message = "Hubo un error al intentar crear la cuenta.";
          break;
      }

      console.log("ERROR: ", message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Cuenta</title>{" "}
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Crear cuenta</Title>
          <div>
            <Button to="/login">Iniciar sesión</Button>
          </div>
        </HeaderContainer>
      </Header>

      <Form onSubmit={onFinish}>
        <Svg></Svg>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        ></Input>
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleChange}
        ></Input>
        <Input
          type="password"
          name="repeatPassword"
          placeholder="Repite la contraseña"
          value={repeatPassword}
          onChange={handleChange}
        ></Input>
        <ButtonContainer>
          <Button as="button" primario="true">
            Crear cuenta
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default RegisterUsers;
