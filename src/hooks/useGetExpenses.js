import { useEffect, useState } from "react";
import { db } from "./../firebase/configFirebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthStore";

const useGetExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();
  const [lastExpense, setLastExpense] = useState(null);
  const [isThereMoreContent, setIsThereMoreContent] = useState(false);

  const getMoreExpenses = () => {
    const queryResult = query(
      collection(db, "expensives"),
      where("Uid", "==", user.uid),
      orderBy("Fecha", "desc"),
      limit(10),
      startAfter(lastExpense)
    );

    onSnapshot(queryResult, (snapshot) => {
      if (snapshot.docs.length > 0) {
        setLastExpense(snapshot.docs[snapshot.docs.length - 1]);

        setExpenses((prevExpenses) =>
          prevExpenses.concat(
            snapshot.docs.map((expensive) => {
              return { ...expensive.data(), id: expensive.id };
            })
          )
        );

        setIsThereMoreContent(snapshot.docs.length === 10);
      } else {
        setIsThereMoreContent(false);
      }
    });
  };

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
        if (snapshot.docs.length > 0) {
          setLastExpense(snapshot.docs[snapshot.docs.length - 1]);
          setIsThereMoreContent(true);
        } else {
          setIsThereMoreContent(false);
        }

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

  return [expenses, isThereMoreContent, getMoreExpenses];
};

export default useGetExpenses;
