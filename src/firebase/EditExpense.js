import { doc, updateDoc } from "firebase/firestore";
import { db } from "./configFirebase";

const EditExpensive = async ({ id, category, description, amount, date }) => {
  const document = doc(db, "expensives", id);

  return await updateDoc(document, {
    Categoria: category,
    Descripcion: description,
    Cantidad: Number(amount),
    Fecha: date,
  });
};

export default EditExpensive;
