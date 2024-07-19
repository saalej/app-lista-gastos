import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";
import TotalPendingBar from "./TotalSpendingBar";

const ExpenseCategory = () => {
  return (
    <>
      <Helmet>
        <title>Gastos por categoria</title>
      </Helmet>
      <Header>
        <Title>Gastos por categoria</Title>
        <BtnReturn></BtnReturn>
      </Header>
      <TotalPendingBar></TotalPendingBar>
    </>
  );
};

export default ExpenseCategory;
