import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

export default function Header() {

  const { cars, getCurrentCar } = useCarStore();
  const currentCar = getCurrentCar();

  const [title, setTitle] = useState<string>(currentCar?.name || "Caroo Manager");

  const router = useRouter();
  const color = currentCar?.name ? { color: "orangered" } : {};

  //TODO: fix back button functionality
  function goBack() {
    if(router.canGoBack())
      router.back();
  }

  useEffect(() => {
    const currentCar = getCurrentCar();
    if (currentCar)
      setTitle(currentCar.name);
  }, [cars]);

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={goBack}>
        <ThemedIcon name="arrow-left" style={[color, styles.icon]} />
      </Pressable>
      <ThemedText type="title" style={color}>{title}</ThemedText>
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
    fontSize: 20
  }
});
