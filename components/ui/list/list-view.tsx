import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet } from "react-native";

type ListViewProps = {
  title: string,
  addHref: any, //! TEMP
  items: ReactNode
};

export default function ListView({ title, addHref, items }: ListViewProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>{title}</ThemedText>
        <Link href={addHref} asChild>
          <Pressable>
            <ThemedView style={styles.titleButtonContainer}>
              <ThemedIcon name="plus" style={styles.titleButtonIcon} />
              <ThemedText style={styles.titleButtonText}>Add</ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.list}>
        {items}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    width: "100%",
    maxWidth: 600
  },
  titleText: {

  },
  titleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "orangered"
  },
  titleButtonIcon: {
    fontSize: 18,
    color: "#eee"
  },
  titleButtonText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: "#eee"
  },
  list: {
    gap: 20,
    width: Dimensions.get('window').width,
    maxWidth: 600
  }
});
