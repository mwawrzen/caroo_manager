import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Pressable, StyleSheet } from "react-native";

type FormCheckboxProps = {
  label: string;
  onPress: () => void;
  checked?: boolean;
};

export default function FormCheckbox({ label, onPress, checked = true }: FormCheckboxProps) {
  return (
    <ThemedView style={styles.checkboxContainer}>
      <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
      <Pressable onPress={onPress}>
        <ThemedView style={styles.checkbox}>
          { checked ? <ThemedView style={styles.checkboxIndicator} /> : null }
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 6
  },
  checkboxLabel: {
    fontSize: 20
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "orangered",
    backgroundColor: "transparent",
    padding: 6
  },
  checkboxIndicator: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "orangered"
  }
});
