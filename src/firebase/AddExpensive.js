import { addDoc, collection } from "firebase/firestore";
import { db } from "./configFirebase";

const AddExpensive = ({ category, description, amount, date, uid }) => {
  return addDoc(collection(db, "expensives"), {
    Uid: uid,
    Categoria: category,
    Descripcion: description,
    Cantidad: Number(amount),
    Fecha: date,
  });
};

export default AddExpensive;
