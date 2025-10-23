import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.buttonGroup}>
        <Link href="/add-service" asChild>
          <Pressable>
            <ThemedView style={styles.button}>
              <ThemedIcon name="wrench" style={styles.buttonIcon} />
              <ThemedText>Add service</ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
        <Link href="/add-refuel" asChild>
          <Pressable>
            <ThemedView style={styles.button}>
              <ThemedIcon name="gas-pump" style={styles.buttonIcon} />
              <ThemedText type="default">Add refuel</ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>
      <ThemedText type="subtitle">General info</ThemedText>
      <ThemedView style={styles.infoRow}>
        <ThemedView style={styles.itemBox}>
          <ThemedText style={styles.itemNumber}>11,34</ThemedText>
          <ThemedText style={styles.itemUnit}>L / 100km</ThemedText>
        </ThemedView>
        <ThemedView style={styles.itemBox}>
          <ThemedText style={styles.itemNumber}>42,19</ThemedText>
          <ThemedText style={styles.itemUnit}>zł / 100km</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10
  },
  button: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  buttonIcon: {
    fontSize: 20
  },
  infoRow: {
    flexDirection: "row",
    gap: 20
  },
  itemBox: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "orangered"
  },
  itemNumber: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 64,
    textAlign: "center",
    lineHeight: 76
  },
  itemUnit: {
    fontSize: 20,
    textAlign: "center"
  }
});
