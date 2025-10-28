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
    <Pressable onPress={onPress}>
      <ThemedView style={styles.checkboxContainer}>
        <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
        <ThemedView style={styles.checkbox}>
          { checked ? <ThemedView style={styles.checkboxIndicator} /> : null }
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginHorizontal: "auto",
    gap: 10,
    padding: 6
  },
  checkboxLabel: {
    fontSize: 18
  },
  checkbox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "orangered",
    backgroundColor: "transparent",
    padding: 4
  },
  checkboxIndicator: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: "orangered"
  }
});
