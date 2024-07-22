import { useEffect, useState } from "react";
import { db } from "./../firebase/configFirebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useGetExpense = (id) => {
  const [expense, setExpense] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getExpense = async () => {
      try {
        const document = await getDoc(doc(db, "expensives", id)); // Asegúrate de que "expenses" es el nombre correcto de la colección
        if (document.exists()) {
          setExpense(document.data()); // Asegúrate de llamar a `data()` para obtener los datos del documento
        } else {
          navigate("/lista-gastos");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        navigate("/lista-gastos"); // Redirigir en caso de error también
      }
    };

    getExpense();
  }, [navigate, id]);

  return [expense];
};

export default useGetExpense;
