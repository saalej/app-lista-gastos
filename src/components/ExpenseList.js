import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";
import TotalPendingBar from "./TotalSpendingBar";
import useGetExpenses from "../hooks/useGetExpenses";
import {
  List,
  ListElement,
  Category,
  Description,
  Value,
  Date,
  ButtonContainer,
  ButtonAction,
  ButtonLoadMore,
  CentralButtonContainer,
  SubtitleContainer,
  Subtitle,
} from "../elements/ExpensiveList";
import IconsCategory from "../elements/IconsCategory";
import formatAmount from "../functions/ConvertToCurrency";
import { ReactComponent as EditIcon } from "./../images/editar.svg";
import { ReactComponent as DeleteExpense } from "./../images/borrar.svg";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import deleteExpense from "../firebase/DeleteExpense";

const ExpenseList = () => {
  const [expenses, isThereMoreContent, getMoreExpenses] = useGetExpenses();

  const formatDate = (date) => {
    return format(fromUnixTime(date), "dd 'de'  MMMM 'de' yyyy", {
      locale: es,
    });
  };

  const sameDate = (expensives, index, expense) => {
    if (index !== 0) {
      const currentDate = formatDate(expense.Fecha);
      const previusDate = formatDate(expensives[index - 1].Fecha);

      return currentDate === previusDate;
    }
  };

  return (
    <>
      <Helmet>
        <title>Lista de gastos</title>
      </Helmet>
      <Header>
        <Title>Lista de gastos</Title>
        <BtnReturn></BtnReturn>
      </Header>

      <List>
        {expenses.map((expense, index) => {
          return (
            <div key={expense.id}>
              {!sameDate(expenses, index, expense) && (
                <Date>{formatDate(expense.Fecha)}</Date>
              )}
              <ListElement key={expense.id}>
                <Category>
                  <IconsCategory id={expense.Categoria}></IconsCategory>
                  {expense.Categoria}
                </Category>
                <Description>{expense.Descripcion}</Description>

                <Value>{formatAmount(expense.Cantidad)}</Value>
                <ButtonContainer>
                  <ButtonAction as={Link} to={`/editar/${expense.id}`}>
                    <EditIcon></EditIcon>
                  </ButtonAction>
                  <ButtonAction onClick={() => deleteExpense(expense.id)}>
                    <DeleteExpense></DeleteExpense>
                  </ButtonAction>
                </ButtonContainer>
              </ListElement>
            </div>
          );
        })}
        {isThereMoreContent && (
          <CentralButtonContainer>
            <ButtonLoadMore onClick={() => getMoreExpenses()}>
              Cargar más...
            </ButtonLoadMore>
          </CentralButtonContainer>
        )}

        {expenses.length === 0 && (
          <SubtitleContainer>
            <Subtitle>No hay gastos por mostrar</Subtitle>

            <Button as={Link} to="/">
              Agregar gasto
            </Button>
          </SubtitleContainer>
        )}
      </List>

      <TotalPendingBar></TotalPendingBar>
    </>
  );
};

export default ExpenseList;
