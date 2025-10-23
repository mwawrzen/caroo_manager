import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

export default function Header({ title }: { title?: string }) {

  const router = useRouter();
  const color = title ? { color: "orangered" } : {};
  title = title || "Caroo Manager";

  //TODO: fix back button functionality
  function goBack() {
    if(router.canGoBack())
      router.back();
  }

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={goBack}>
        <ThemedIcon name="arrow-left" style={[color, styles.icon]} />
      </Pressable>
      <ThemedText type="title" style={[color]}>{title}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    width: "100%",
    padding: 28
  },
  icon: {
    marginTop: 6,
    fontSize: 20
  }
});
