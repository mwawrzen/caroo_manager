import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type FormRadioGroupProps = {
  title?: string;
  children: ReactNode;
};

export default function FormRadioGroup({
  title = '',
  children
}: FormRadioGroupProps) {
  return (
    <>
      {
        title ?
          <ThemedText style={{ textAlign: "center" }}>
            {title}
          </ThemedText> : null
      }
      <ThemedView style={styles.radioGroup}>
        {children}
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10
  }
});
