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
import ExpenseCategory from "./components/ExpensesCategory";
import ExpenseList from "./components/ExpensesList";
import { Helmet } from "react-helmet";
import favicon from "./images/logo.png";
import Background from "./elements/Background";

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
    </Helmet>

    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro-usuario" element={<RegisterUsers />}></Route>
          <Route path="/editar-gasto/:id" element={<ExpenseEdit />}></Route>
          <Route path="/lista-gastos" element={<ExpenseList />}></Route>
          <Route path="/gastos-categoria" element={<ExpenseCategory />}></Route>
          <Route path="/" element={<App />} />
        </Routes>
      </Container>
    </BrowserRouter>

    <Background></Background>
  </>
);
