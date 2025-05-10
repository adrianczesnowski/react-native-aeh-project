import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  useDocuments,
  Document as DocumentType,
} from "@/context/DocumentContext";
import { useNetwork } from "@/context/NetworkContext";

export function useDocumentDetailsViewModel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getDocumentById } = useDocuments();
  const { isConnected } = useNetwork();

  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      const data = await getDocumentById(id);
      setDocument(data);
      setLoading(false);
    })();
  }, [id]);

  const goBack = () => router.back();

  return { document, loading, isConnected, goBack };
}
