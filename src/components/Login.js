import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, HeaderContainer, Title } from "./../elements/Header";
import Button from "../elements/Button";
import { ButtonContainer, Input, Form } from "./../elements/FormElements";
import { ReactComponent as SvgLogin } from "./../images/login.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/configFirebase";
import Alert from "../elements/Alert";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem; /* 20px */
`;

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setStateAlert(false);
    setAlert({});

    const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if (email === "" || password === "") {
      setStateAlert(true);
      setAlert({ type: "error", message: "Favor de llenar todos los datos" });
      return;
    }

    if (!regex.test(email)) {
      setStateAlert(true);
      setAlert({ type: "error", message: "Correo electronico invalido" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStateAlert(true);
      setAlert({
        type: "success",
        message: "Bienvinido al sistema",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setStateAlert(true);
      let message;
      switch (error.code) {
        case "auth/wrong-password":
          message = "La contraseña es incorrecta.";
          break;
        case "auth/user-not-found":
          message = "El usuario proporcionado no puede ser encontrado.";
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
        <ButtonContainer>
          <Button as="button" primario="true">
            Iniciar sesión
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

export default Login;
