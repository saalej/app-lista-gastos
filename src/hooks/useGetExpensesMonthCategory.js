import { useEffect, useState } from "react";
import useGetExpensesMonth from "./useGetExpensesMonth";

const useGetExpensesMonthCategory = () => {
  const [expensesCategory, setExpensesCategory] = useState([]);
  const expensesMonth = useGetExpensesMonth();

  useEffect(() => {
    const sumOfExpenses = expensesMonth.reduce(
      (resultingObject, currentObject) => {
        const currentCategory = currentObject.Categoria;
        const currentAmount = currentObject.Cantidad;

        resultingObject[currentCategory] += currentAmount;
        return resultingObject;
      },
      {
        Comida: 0,
        "Cuentas y pagos": 0,
        Hogar: 0,
        Transporte: 0,
        Ropa: 0,
        "Salud e higiene": 0,
        Compras: 0,
        Diversion: 0,
      }
    );

    setExpensesCategory(
      Object.keys(sumOfExpenses).map((element) => {
        return { Categoria: element, Cantidad: sumOfExpenses[element] };
      })
    );
  }, [setExpensesCategory, expensesMonth]);

  return expensesCategory;
};

export default useGetExpensesMonthCategory;
