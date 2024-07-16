import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";

const ExpenseList = () => {
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
