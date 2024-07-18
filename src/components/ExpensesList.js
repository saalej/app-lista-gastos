import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";
import { useAuth } from "../contexts/AuthStore";

const ExpenseList = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>
      <Header>
        <Title>Lista de gastos</Title>
        <BtnReturn></BtnReturn>
      </Header>
    </>
  );
};

export default ExpenseList;
