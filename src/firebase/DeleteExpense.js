import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./configFirebase";

const deleteExpense = async (id) => {
  await deleteDoc(doc(db, "expensives", id));
};

export default deleteExpense;
