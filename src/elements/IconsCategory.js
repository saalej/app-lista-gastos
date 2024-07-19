import React from "react";
import { ReactComponent as FoodIcon } from "./../images/cat_comida.svg";
import { ReactComponent as ShoppingIcon } from "./../images/cat_compras.svg";
import { ReactComponent as AccountsPaymentsIcon } from "./../images/cat_cuentas-y-pagos.svg";
import { ReactComponent as EntertainmentIcon } from "./../images/cat_diversion.svg";
import { ReactComponent as HomeIcon } from "./../images/cat_hogar.svg";
import { ReactComponent as ClothesIcon } from "./../images/cat_ropa.svg";
import { ReactComponent as HealthIcon } from "./../images/cat_salud-e-higiene.svg";
import { ReactComponent as TransportIcon } from "./../images/cat_transporte.svg";

const IconsCategory = ({ id }) => {
  switch (id.toLowerCase()) {
    case "comida":
      return <FoodIcon></FoodIcon>;
    case "cuentas y pagos":
      return <AccountsPaymentsIcon></AccountsPaymentsIcon>;
    case "hogar":
      return <HomeIcon></HomeIcon>;
    case "transporte":
      return <TransportIcon></TransportIcon>;
    case "ropa":
      return <ShoppingIcon></ShoppingIcon>;
    case "salud e higiene":
      return <HealthIcon></HealthIcon>;
    case "compras":
      return <ClothesIcon></ClothesIcon>;
    case "diversion":
      return <EntertainmentIcon></EntertainmentIcon>;
    default:
      return;
  }
};

export default IconsCategory;
