import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

export default function Header() {

  const router = useRouter();
  const segments = useSegments();
  const { currentCar } = useCarStore();
  const [isBack, setIsBack] = useState<boolean>(true);

  const title = currentCar ? currentCar.name : "Caroo Manager";

  useEffect(() => {
    setIsBack(router.canGoBack())
  }, [segments]);

  return (
    <ThemedView style={styles.container}>
      {
        currentCar && isBack ?
          <Pressable onPress={() => router.back()}>
            <ThemedIcon
              name="arrow-left"
              style={[currentCar ? { color: "orangered" } : {}, styles.icon]}
            />
          </Pressable> : null
      }
      <ThemedText
        type="title"
        style={currentCar ? { color: "orangered" } : {}}
      >
        {title}
      </ThemedText>
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
