import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function Welcome() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome</ThemedText>
      <Link href="/welcome" asChild style={styles.buttonContainer}>
        {/* <Pressable> */}
          <ThemedText style={styles.buttonLabel}>Sign In</ThemedText>
        {/* </Pressable> */}
      </Link>
      <ThemedText>Or</ThemedText>
      <Link href="/welcome" asChild style={styles.buttonContainer}>
        {/* <Pressable> */}
          <ThemedText style={styles.buttonLabel}>Create Account</ThemedText>
        {/* </Pressable> */}
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 14
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "orangered"
  },
  buttonLabel: {
    fontSize: 22,
    textAlign: "center"
  }
});
