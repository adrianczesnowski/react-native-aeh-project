import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useTransactions } from "@/context/TransactionContext";

const categories = [
  { id: "groceries", name: "Zakupy spożywcze", icon: "cart", isExpense: true },
  { id: "dining", name: "Restauracje", icon: "restaurant", isExpense: true },
  { id: "transport", name: "Transport", icon: "car", isExpense: true },
  { id: "utilities", name: "Rachunki", icon: "flash", isExpense: true },
  { id: "entertainment", name: "Rozrywka", icon: "film", isExpense: true },
  { id: "health", name: "Zdrowie", icon: "medical", isExpense: true },
  { id: "shopping", name: "Zakupy", icon: "bag", isExpense: true },
  {
    id: "other_expense",
    name: "Inne",
    icon: "ellipsis-horizontal",
    isExpense: true,
  },
  { id: "salary", name: "Wynagrodzenie", icon: "cash", isExpense: false },
  { id: "gift", name: "Prezent", icon: "gift", isExpense: false },
  {
    id: "investment",
    name: "Inwestycje",
    icon: "trending-up",
    isExpense: false,
  },
  {
    id: "other_income",
    name: "Inne",
    icon: "ellipsis-horizontal",
    isExpense: false,
  },
];

export function useTransactionModalViewModel() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { addTransaction, getTransactions } = useTransactions();

  const filteredCategories = categories.filter(
    (c) => c.isExpense === (type === "expense")
  );

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!amount || isNaN(Number(amount)) || +amount <= 0) {
      errs.amount = "Nieprawidłowa kwota";
    }
    if (!category) {
      errs.category = "Wybierz kategorię";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [amount, category]);

  const handleSave = useCallback(async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await addTransaction({
        type,
        amount: Number(amount),
        category,
        description,
        date: new Date().toISOString(),
      });
      await getTransactions();
      router.back();
    } catch {
      Alert.alert("Błąd", "Nie udało się dodać transakcji");
    } finally {
      setSubmitting(false);
    }
  }, [
    type,
    amount,
    category,
    description,
    validate,
    addTransaction,
    getTransactions,
  ]);

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return {
    type,
    setType,
    amount,
    setAmount,
    category,
    setCategory,
    description,
    setDescription,
    errors,
    submitting,
    filteredCategories,
    handleSave,
    handleCancel,
  };
}
