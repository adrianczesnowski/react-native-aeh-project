import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import TransactionCard from "../../components/TransactionCard";
import SyncIndicator from "../../components/SyncIndicator";
import { useIndexViewModel } from "./useIndexViewModel";

export default function DashboardScreen() {
  const {
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
  } = useIndexViewModel();

  if (loading && isConnected) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {pendingSyncCount > 0 && (
        <SyncIndicator count={pendingSyncCount} isOnline={isConnected} />
      )}

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Bilans środków</Text>
        <Text style={styles.balanceAmount}>
          {(totalIncome - totalExpense).toFixed(2)} zł
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Przychody</Text>
          <Text style={[styles.statAmount, { color: Colors.green }]}>
            +{totalIncome.toFixed(2)} zł
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Wydatki</Text>
          <Text style={[styles.statAmount, { color: Colors.red }]}>
            -{totalExpense.toFixed(2)} zł
          </Text>
        </View>
      </View>

      <View style={styles.recentContainer}>
        {/* … header with buttons */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ostatnie transakcje</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={onFilterIncome}
            >
              <Text style={styles.filterButtonText}>Przychody</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={onFilterExpenses}
            >
              <Text style={styles.filterButtonText}>Wydatki</Text>
            </TouchableOpacity>
          </View>
        </View>

        {recentTransactions.length > 0 ? (
          <FlatList
            data={recentTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                transaction={item}
                onPress={() => onView(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Brak transakcji</Text>
            <TouchableOpacity style={styles.addButton} onPress={onAdd}>
              <Text style={styles.addButtonText}>
                Dodaj pierwszą transakcję
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.fab} onPress={onAdd}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 64,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  balanceCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
  },
  balanceAmount: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  recentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
  },
  filterButton: {
    marginLeft: 12,
  },
  filterButtonText: {
    color: Colors.primary,
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
