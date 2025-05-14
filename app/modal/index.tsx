import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTransactionModalViewModel } from "./useTransactionModalViewModel";
import Colors from "@/constants/Colors";

export default function TransactionModal() {
  const vm = useTransactionModalViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Dodaj transakcję</Text>
          <TouchableOpacity onPress={vm.handleCancel}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.typeSelector}>
          {["expense", "income"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeButton,
                vm.type === t && styles.activeTypeButton,
              ]}
              onPress={() => vm.setType(t as any)}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  vm.type === t && styles.activeTypeButtonText,
                ]}
              >
                {t === "expense" ? "Wydatek" : "Przychód"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.formGroup}>
          <Text>Kwota</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={vm.amount}
            onChangeText={vm.setAmount}
            placeholder="0,00"
          />
          {vm.errors.amount && (
            <Text style={styles.errorText}>{vm.errors.amount}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Kategoria</Text>
          <View style={styles.categoriesContainer}>
            {vm.filteredCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  vm.category === cat.id && styles.selectedCategory,
                ]}
                onPress={() => vm.setCategory(cat.id)}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={20}
                  color={vm.category === cat.id ? "white" : "#555"}
                />
                <Text
                  style={[
                    styles.categoryText,
                    vm.category === cat.id && styles.selectedCategoryText,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {vm.errors.category && (
            <Text style={styles.errorText}>{vm.errors.category}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text>Opis (opcjonalnie)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={vm.description}
            onChangeText={vm.setDescription}
            placeholder="Opis"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={vm.handleSave}
          disabled={vm.submitting}
        >
          <Text style={styles.saveButtonText}>
            {vm.submitting ? "Zapisuję..." : "Zapisz"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    paddingTop: 64,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  activeTypeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: Colors.red,
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 4,
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#555",
  },
  selectedCategoryText: {
    color: "white",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
