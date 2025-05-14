import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Transaction, useTransactions } from "@/context/TransactionContext";
import { Ionicons } from "@expo/vector-icons";

export function useTransactionDetailsViewModel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTransactionById } = useTransactions();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      const data = await getTransactionById(id);
      setTransaction(data);
      setLoading(false);
    })();
  }, [id]);

  const goBack = () => router.back();

  const getCategoryName = (cat: string) => {
    const map: Record<string, string> = {
      groceries: "Zakupy spożywcze",
      dining: "Restauracje",
      transport: "Transport",
      utilities: "Rachunki",
      entertainment: "Rozrywka",
      health: "Zdrowie",
      shopping: "Zakupy",
      other_expense: "Inne wydatki",
      salary: "Wynagrodzenie",
      investment: "Inwestycje",
      gift: "Prezent",
      other_income: "Inne przychody",
    };
    return map[cat] ?? "Inne";
  };

  const getCategoryIcon = (cat: string) => {
    const map: Record<string, keyof typeof Ionicons.glyphMap> = {
      groceries: "cart",
      dining: "restaurant",
      transport: "car",
      utilities: "flash",
      entertainment: "film",
      health: "medical",
      shopping: "bag",
      other_expense: "ellipsis-horizontal",
      salary: "cash",
      investment: "trending-up",
      gift: "gift",
      other_income: "ellipsis-horizontal",
    };
    return map[cat] ?? "ellipse";
  };

  return {
    transaction,
    loading,
    goBack,
    getCategoryName,
    getCategoryIcon,
  };
}
