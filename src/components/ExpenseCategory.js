import React from "react";
import { Helmet } from "react-helmet";
import { Header, Title } from "../elements/Header";
import BtnReturn from "../elements/BtnReturn";
import TotalPendingBar from "./TotalSpendingBar";
import useGetExpensesMonthCategory from "../hooks/useGetExpensesMonthCategory";
import {
  ListCategory,
  Category,
  Value,
  ListCategoryElement,
} from "../elements/ExpensiveList";
import IconsCategory from "../elements/IconsCategory";
import formatAmount from "../functions/ConvertToCurrency";

const ExpenseCategory = () => {
  const expensesCategory = useGetExpensesMonthCategory();

  console.log(expensesCategory);

  return (
    <>
      <Helmet>
        <title>Gasto mensual por categoria</title>
      </Helmet>
      <Header>
        <Title>Gasto mensual por categoria</Title>
        <BtnReturn></BtnReturn>
      </Header>

      <ListCategory>
        {expensesCategory.map((element, index) => {
          return (
            <ListCategoryElement index={index}>
              <Category>
                <IconsCategory id={element.Categoria}></IconsCategory>
                {element.Categoria}
              </Category>
              <Value>{formatAmount(element.Cantidad)}</Value>
            </ListCategoryElement>
          );
        })}
      </ListCategory>

      <TotalPendingBar></TotalPendingBar>
    </>
  );
};

export default ExpenseCategory;
