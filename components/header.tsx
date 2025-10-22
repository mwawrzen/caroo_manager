import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function Header() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Caroo Manager</ThemedText>
      <Pressable onPress={()=>{}}>
        <FontAwesome name="bars" style={styles.button} />
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 28
  },
  button: {
    fontSize: 32,
    color: "orangered"
  }
});
