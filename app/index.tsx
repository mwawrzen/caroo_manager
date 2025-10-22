import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText></ThemedText>
      <Link href="/add-refuel" asChild>
        <Pressable>
          <ThemedView style={styles.button}>
            <ThemedText type="default">Add refuel</ThemedText>
          </ThemedView>
        </Pressable>
      </Link>
      <Link href="/add-service" asChild>
        <Pressable>
          <ThemedView style={styles.button}>
            <ThemedText>Add service</ThemedText>
          </ThemedView>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 8
  }
});
