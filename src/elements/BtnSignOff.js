import React from "react";
import { ReactComponent as SignOffIcon } from "./../images/log-out.svg";
import Button from "./Button";
import { auth } from "../firebase/configFirebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const BtnSignOff = () => {
  const navigate = useNavigate();
  const signOff = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button bigIcon as="button" onClick={signOff}>
      <SignOffIcon></SignOffIcon>
    </Button>
  );
};

export default BtnSignOff;
