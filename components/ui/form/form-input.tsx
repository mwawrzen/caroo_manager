import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInputProps } from "react-native";

type FormInputProps = TextInputProps & {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>> | ((value: string) => void);
  placeholder?: string;
  unit?: string;
};

export default function FormInput({
  value,
  onChangeText,
  placeholder = '',
  unit,
  ...rest
}: FormInputProps) {
  return (
    <ThemedView style={styles.inputRow}>
      <ThemedTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...rest}
      />
      { unit ? <ThemedText style={styles.inputUnit}>{unit}</ThemedText> : null }
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  inputUnit: {
    width: "18%",
    fontFamily: "Quicksand_700Bold",
    fontSize: 28
  }
});
