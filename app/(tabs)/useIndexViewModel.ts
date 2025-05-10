import { useState, useEffect, useCallback, useRef } from "react";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { useAuth } from "../../context/AuthContext";
import { useNetwork } from "../../context/NetworkContext";
import { Transaction, useTransactions } from "@/context/TransactionContext";

export function useIndexViewModel() {
  const { user } = useAuth();
  const { transactions, loading, pendingSyncCount, getTransactions } =
    useTransactions();
  const { isConnected } = useNetwork();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (user && !initialLoadDone.current) {
      getTransactions();
      initialLoadDone.current = true;
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user && initialLoadDone.current && isConnected) {
        getTransactions();
      }
    }, [isConnected, user])
  );

  useEffect(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((t) => {
      t.type === "income" ? (income += t.amount) : (expense += t.amount);
    });
    setTotalIncome(income);
    setTotalExpense(expense);
    setRecentTransactions(transactions.slice(0, 5));
  }, [transactions]);

  const onAdd = useCallback(() => {
    router.push("/modal");
  }, []);

  const onView = useCallback((id: string) => {
    router.push(`/transaction-details/${id}`);
  }, []);

  const onFilterIncome = useCallback(() => {
    router.push("/(tabs)/income");
  }, []);

  const onFilterExpenses = useCallback(() => {
    router.push("/(tabs)/expenses");
  }, []);

  return {
    loading,
    isConnected,
    pendingSyncCount,
    totalIncome,
    totalExpense,
    recentTransactions,
    onAdd,
    onView,
    onFilterIncome,
    onFilterExpenses,
  };
}
