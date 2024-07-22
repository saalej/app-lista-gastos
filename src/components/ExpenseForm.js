import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  BigInput,
  Input,
  Form,
  FilterContainer,
} from "../elements/FormElements";
import Button from "../elements/Button";
import { ReactComponent as PlusIcon } from "../images/plus.svg";
import SelecCategory from "./SelectCategory";
import DatePicker from "./DatePicker";
import AddExpensive from "../firebase/AddExpensive";
import { fromUnixTime, getUnixTime } from "date-fns";
import { useAuth } from "./../contexts/AuthStore";
import Alert from "../elements/Alert";
import { useNavigate } from "react-router-dom";
import EditExpensive from "../firebase/EditExpense";

const ExpenseForm = ({ expense, id }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Hogar");
  const [date, setDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);

  const [stateAlert, setStateAlert] = useState(false);
  const [alert, setAlert] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Revisar si ya hay algun gasto
    // Establecer el gasto en caso de que exista
    if (expense) {
      setIsEdit(true);
      if (expense.Uid === user.uid) {
        setDescription(expense.Descripcion);
        setAmount("$" + expense.Cantidad);
        setDate(fromUnixTime(expense.Fecha));
        setCategory(expense.Categoria);
      } else {
        navigate("/lista-gastos");
      }
    }
  }, [expense, user, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "amount") {
      const value = e.target.value.replace(/[^0-9.]+|\.(?=.*\.)/g, "");
      setAmount(value ? "$" + value : "");
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();

    setStateAlert(false);
    setAlert({});

    try {
      if (description !== "" && amount !== "") {
        const amountFloat = parseFloat(amount.substring(1)).toFixed(2);

        if (amountFloat) {
          if (isEdit && expense) {
            EditExpensive({
              id: id,
              category: category,
              description: description,
              amount: amountFloat,
              date: getUnixTime(date),
            })
              .then(() => {
                setStateAlert(true);
                setAlert({
                  type: "success",
                  message: "El gasto fue editado correctamente",
                });
              })
              .catch((error) => {
                setStateAlert(true);
                setAlert({
                  type: "error",
                  message: "Error al editar el gasto: " + error,
                });
              });

            setTimeout(() => {
              navigate("/lista-gastos");
            }, 1500);
          } else {
            await AddExpensive({
              uid: user?.uid,
              description: description,
              amount: amountFloat, // Cantidad sin el simbolo $ y como decimal
              category: category,
              date: getUnixTime(date), // Guardar la fecha en formato Unix
            })
              .then(() => {
                setCategory("Hogar");
                setDescription("");
                setAmount("");
                setDate(new Date());

                setStateAlert(true);
                setAlert({
                  type: "success",
                  message: "Gasto agreado correctamente",
                });
              })
              .catch((error) => {
                setStateAlert(true);
                setAlert({
                  type: "error",
                  message: "Error al agregar el gasto: " + error,
                });
              });
          }
        } else {
          setStateAlert(true);
          setAlert({
            type: "error",
            message: "Favor de agregar los valores necesarios",
          });
        }
      } else {
        setStateAlert(true);
        setAlert({
          type: "error",
          message: "Favor de agregar los valores necesarios",
        });
      }
    } catch (error) {
      setStateAlert(true);
      setAlert({
        type: "error",
        message: "Error al agregar el gasto: " + error,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={onFinish}>
        <FilterContainer>
          <SelecCategory category={category} setCategory={setCategory} />
          <DatePicker date={date} setDate={setDate} />
        </FilterContainer>
        <div>
          <Input
            type="text"
            name="description"
            id="description"
            placeholder="Descripción"
            value={description}
            onChange={handleChange}
          ></Input>
          <BigInput
            type="text"
            name="amount"
            id="amount"
            placeholder="$0.00"
            value={amount}
            onChange={handleChange}
          ></BigInput>
          <ButtonContainer>
            <Button as="button" primario="true" conIcono type="submit">
              {!isEdit ? "Agregar gasto" : "Editar gasto"}
              <PlusIcon></PlusIcon>
            </Button>
          </ButtonContainer>
        </div>
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

export default ExpenseForm;
