import React from "react";
import styled from "styled-components";
import theme from "../Theme";
import formatAmount from "../functions/ConvertToCurrency";

const TotalBar = styled.div`
  background: ${theme.verde};
  font-size: 1.25rem; /* 20px */
  letter-spacing: 1px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 0.62rem 2.25rem; /* 10px 40px */
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 31.25rem) {
    /* 500px */
    flex-direction: column;
    font-size: 14px;
  }
`;

const TotalPendingBar = () => {
  return (
    <TotalBar>
      <p>Total gastado en el mes: </p>
      <p>{formatAmount(1550.4)}</p>
    </TotalBar>
  );
};

export default TotalPendingBar;
