import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Settings() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>settings.</ThemedText>
    </ThemedView>
  );
};
