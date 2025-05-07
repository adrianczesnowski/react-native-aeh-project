import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { firestore, auth } from "../../../utils/firebase";

export function useProfileViewModel() {
  const { user, logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = useCallback(() => {
    Alert.alert("Wylogowanie", "Czy na pewno chcesz się wylogować?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Wyloguj",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  }, [logout]);

  const deleteUserTransactions = useCallback(
    async (userId: string) => {
      const ref = collection(firestore, "users", userId, "transactions");
      const snap = await getDocs(ref);
      const batch = writeBatch(firestore);
      snap.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
    },
    []
  );

  const clearLocalStorage = useCallback(async () => {
    await AsyncStorage.clear();
  }, []);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      "Usuń konto",
      "Czy na pewno chcesz usunąć swoje konto? Ta operacja jest nieodwracalna.",
      [
        { text: "Anuluj", style: "cancel" },
        {
          text: "Usuń konto",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              if (!user) return;
              await deleteUserTransactions(user.uid);
              await deleteDoc(doc(firestore, "users", user.uid));
              await clearLocalStorage();
              const currentUser = auth.currentUser;
              if (currentUser) await currentUser.delete();
              router.replace("/login");
              Alert.alert("Sukces", "Konto zostało usunięte.");
            } catch {
              Alert.alert("Błąd", "Nie udało się usunąć konta.");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  }, [user, deleteUserTransactions, clearLocalStorage]);

  return {
    user,
    isDeleting,
    handleLogout,
    handleDeleteAccount,
  };
}
