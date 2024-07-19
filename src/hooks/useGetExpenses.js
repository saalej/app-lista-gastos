import { useEffect, useState } from "react";
import { db } from "./../firebase/configFirebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthStore";

const useGetExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const queryResult = query(
      collection(db, "expensives"),
      where("Uid", "==", user.uid),
      limit(10),
      orderBy("Fecha", "desc")
    );

    const unsuscribe = onSnapshot(
      queryResult,
      (snapshot) => {
        // if (snapshot.docs.length > 0) {
        // } else {
        // }

        setExpenses(
          snapshot.docs.map((expensive) => ({
            id: expensive.id, // Incluye el id del documento
            ...expensive.data(), // Copia los datos del documento
          }))
        );
      },
      (error) => console.log(error)
    );

    return unsuscribe;
  }, [user]);

  return [expenses];
};

export default useGetExpenses;
