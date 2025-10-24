import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

export default function Header() {

  const router = useRouter()
  ;
  const { currentCar } = useCarStore();

  const title = currentCar ? currentCar.name : "Caroo Manager";

  //TODO: fix back button functionality
  function goBack() {
    if(router.canGoBack())
      router.back();
  }

  return (
    <ThemedView style={styles.container}>
      {
        currentCar ?
          <Pressable onPress={goBack}>
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
