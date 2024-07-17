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
import Alert from "../elements/Alert";

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
  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});

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
    setStateAlert(false);
    setAlert({});

    const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if (email === "" || password === "" || repeatPassword === "") {
      setStateAlert(true);
      setAlert({ type: "error", message: "Favor de llenar todos los datos" });
      return;
    }

    if (!regex.test(email)) {
      setStateAlert(true);
      setAlert({ type: "error", message: "Correo electronico invalido" });
      return;
    }

    if (password !== repeatPassword) {
      setStateAlert(true);
      setAlert({ type: "error", message: "Las contraseñas no coinciden" });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setStateAlert(true);
      setAlert({
        type: "success",
        message: "El usuario fue creado de manera exitosa.",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setStateAlert(true);
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

      setAlert({ type: "error", message: message });
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
      <Alert
        type={alert?.type}
        message={alert?.message}
        stateAlert={stateAlert}
        setStateAlert={setStateAlert}
      ></Alert>
    </>
  );
};

export default RegisterUsers;
