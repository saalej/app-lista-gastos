import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";
import TotalPendingBar from "./TotalSpendingBar";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import useGetExpense from "../hooks/useGetExpense";

const ExpenseEdit = () => {
  const { id } = useParams();
  const [expense] = useGetExpense(id);

  return (
    <>
      <Helmet>
        <title>Editar gasto</title>
      </Helmet>
      <Header>
        <BtnReturn ruta="/lista-gastos"></BtnReturn>
        <Title>Editar gasto</Title>
      </Header>
      <ExpenseForm expense={expense} id={id}></ExpenseForm>
      <TotalPendingBar></TotalPendingBar>
    </>
  );
};

export default ExpenseEdit;
