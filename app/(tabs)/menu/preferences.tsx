import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { StyleSheet } from "react-native";

export default function Preferences() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>preferences.</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
