import React from "react";
import { useAuth } from "../contexts/AuthStore";
import { Navigate } from "react-router-dom";

const PrivateRute = ({ children, ...restProps }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
};

export default PrivateRute;
