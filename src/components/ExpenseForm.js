import React, { useState } from "react";
import {
  ButtonContainer,
  BigInput,
  Input,
  Form,
  FilterContainer,
} from "../elements/FormElements";
import Button from "../elements/Button";
import { ReactComponent as PlusIcon } from "../images/plus.svg";

const ExpenseForm = () => {
  const [descripcion, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "description") {
      setDescription(e.target.value);
    } else if (e.target.name === "amount") {
      setAmount(e.target.value.replace(/[^0-9.]+|\.(?=.*\.)/g, ""));
    }
  };

  return (
    <Form>
      <FilterContainer>
        <p>Select</p>
        <p>Date Picker</p>
      </FilterContainer>
      <div>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Descripción"
          value={descripcion}
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
            Agregar gasto<PlusIcon></PlusIcon>
          </Button>
        </ButtonContainer>
      </div>
    </Form>
  );
};

export default ExpenseForm;
