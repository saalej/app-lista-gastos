import React, { useContext, useEffect, useState } from "react";
import useGetExpensesMonth from "../hooks/useGetExpensesMonth";

const TotalSpentMonthContext = React.createContext();

const useTotalMonth = () => {
  const context = useContext(TotalSpentMonthContext);

  if (!context) {
    throw new Error(
      "useTotalMonth debe ser usado dentro de un TotalSpentMonthProvider"
    );
  }
  return context.total;
};

const TotalSpentMonthProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const expensesMonth = useGetExpensesMonth();
  useEffect(() => {
    let accumulatedExpense = 0;

    expensesMonth.forEach((expense) => {
      accumulatedExpense += expense.Cantidad;
    });

    setTotal(accumulatedExpense);
  }, [expensesMonth]);

  return (
    <TotalSpentMonthContext.Provider value={{ total: total }}>
      {children}
    </TotalSpentMonthContext.Provider>
  );
};

export { TotalSpentMonthProvider, useTotalMonth };
