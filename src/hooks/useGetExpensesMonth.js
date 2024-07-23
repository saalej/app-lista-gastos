import { useEffect, useState } from "react";
import { db } from "./../firebase/configFirebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "./../contexts/AuthStore";

const useGetExpensesMonth = () => {
  const [expensesMonth, setExpensesMonth] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const startMonth = getUnixTime(startOfMonth(new Date()));
    const endMonth = getUnixTime(endOfMonth(new Date()));

    if (user) {
      const queryResult = query(
        collection(db, "expensives"),
        where("Uid", "==", user.uid),
        where("Fecha", ">=", startMonth),
        where("Fecha", "<=", endMonth),
        orderBy("Fecha", "desc")
      );

      const unsuscribe = onSnapshot(
        queryResult,
        (snapshot) => {
          setExpensesMonth(
            snapshot.docs.map((document) => {
              return { ...document.data(), id: document.id };
            })
          );
        },
        (error) => console.log(error)
      );

      //
      return unsuscribe;
    }
  }, [user]);

  return expensesMonth;
};

export default useGetExpensesMonth;
