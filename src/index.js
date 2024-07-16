import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import WebFont from "webfontloader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./elements/Container";
import Login from "./components/Login";
import RegisterUsers from "./components/RegisterUsers";
import ExpenseEdit from "./components/ExpenseEdit";
import ExpensesCategory from "./components/ExpensesCategory";
import ExpensesList from "./components/ExpensesList";
import { Helmet } from "react-helmet";
import favicon from "./images/logo.png";

WebFont.load({
  google: {
    families: ["Work Sans:400,500,700", "sans-serif"],
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <title>Gastos</title>
    </Helmet>

    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register-users" element={<RegisterUsers />}></Route>
          <Route path="/edit-expense/:id" element={<ExpenseEdit />}></Route>
          <Route path="/expenses-list" element={<ExpensesList />}></Route>
          <Route
            path="/expenses-category"
            element={<ExpensesCategory />}
          ></Route>
          <Route path="/" element={<App />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </>
);
