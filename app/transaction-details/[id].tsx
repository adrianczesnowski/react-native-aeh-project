import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTransactionDetailsViewModel } from "./useTransactionDetailsViewModel";

export default function TransactionDetailsScreen() {
  const { transaction, loading, goBack, getCategoryName, getCategoryIcon } =
    useTransactionDetailsViewModel();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={Colors.red} />
        <Text>Nie znaleziono transakcji</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.buttonText}>Powrót</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatted = new Date(transaction.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    transaction.type === "income" ? Colors.green : Colors.red,
                },
              ]}
            >
              <Ionicons
                name={getCategoryIcon(transaction.category)}
                size={24}
                color="white"
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.type}>
                {transaction.type === "income" ? "Przychód" : "Wydatek"}
              </Text>
              <Text style={styles.category}>
                {getCategoryName(transaction.category)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {transaction.type === "income" ? "Przychód" : "Wydatek"}
            </Text>
            <Text
              style={[
                styles.detailValue,
                {
                  color:
                    transaction.type === "income" ? Colors.green : Colors.red,
                },
              ]}
            >
              {transaction.amount.toFixed(2)} zł
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data</Text>
            <Text style={styles.detailValue}>{formatted}</Text>
          </View>
          {transaction.description ? (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Opis</Text>
              <Text style={styles.detailValue}>{transaction.description}</Text>
            </View>
          ) : null}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusContainer}>
              {transaction.synced ? (
                <>
                  <Ionicons
                    name="cloud-done-outline"
                    size={16}
                    color={Colors.green}
                  />
                  <Text
                    style={[
                      styles.detailValue,
                      { color: Colors.green, marginLeft: 4 },
                    ]}
                  >
                    Synchronizowano
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={16}
                    color={Colors.gray}
                  />
                  <Text
                    style={[
                      styles.detailValue,
                      { color: Colors.gray, marginLeft: 4 },
                    ]}
                  >
                    Oczekuje na synchronizację
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Powrót</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 64,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoContainer: {
    justifyContent: "center",
  },
  type: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
