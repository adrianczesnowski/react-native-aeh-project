import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useDocuments, Document } from "../../../context/DocumentContext";
import { useNetwork } from "../../../context/NetworkContext";

export function useDocumentsViewModel() {
  const { documents, loading, scanDocument, deleteDocument } = useDocuments();
  const { isConnected } = useNetwork();

  const [scannerVisible, setScannerVisible] = useState(false);

  const openScanner = useCallback(() => {
    if (!isConnected) {
      Alert.alert(
        "Brak połączenia",
        "Skanowanie dokumentów wymaga połączenia z internetem"
      );
      return;
    }
    setScannerVisible(true);
  }, [isConnected]);

  const handleScan = useCallback(
    async (imageUri: string, title: string) => {
      const success = await scanDocument(imageUri, title);
      if (success) setScannerVisible(false);
    },
    [scanDocument]
  );

//   const handleView = useCallback((id: string) => {
//     router.push(`/document-details/${id}`);
//   }, []);

  const handleDelete = useCallback(
    (doc: Document) => {
      Alert.alert(
        "Usuń dokument",
        `Czy na pewno chcesz usunąć dokument "${doc.title}"?`,
        [
          { text: "Anuluj", style: "cancel" },
          {
            text: "Usuń",
            style: "destructive",
            onPress: async () => {
              const ok = await deleteDocument(doc.id);
              if (!ok) Alert.alert("Błąd", "Nie udało się usunąć dokumentu");
            },
          },
        ]
      );
    },
    [deleteDocument]
  );

  return {
    documents,
    loading,
    scannerVisible,
    openScanner,
    handleScan,
    // handleView,
    handleDelete,
    setScannerVisible,
  };
}
