import { useCallback, useRef } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useTransactions } from "../../../context/TransactionContext";
import { useAuth } from "../../../context/AuthContext";

export function useExpensesViewModel() {
  const { user } = useAuth();
  const { loading, filterTransactions, getTransactions } = useTransactions();
  const initialLoadDone = useRef(false);

  const expenses = filterTransactions("expense");

  useFocusEffect(
    useCallback(() => {
      if (user && !initialLoadDone.current) {
        getTransactions();
        initialLoadDone.current = true;
      }
    }, [user])
  );

  const onAdd = useCallback(() => {
    router.push("/modal");
  }, []);

  const onView = useCallback((id: string) => {
    router.push(`/transaction-details/${id}`);
  }, []);

  return {
    expenses,
    loading,
    onAdd,
    onView,
  };
}
