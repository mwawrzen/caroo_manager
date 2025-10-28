import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Pressable, PressableProps, StyleSheet } from "react-native";

type ActionButtonProps = PressableProps & {
  value: string;
};

export default function ActionButton({ value, ...rest }: ActionButtonProps) {
  return (
    <Pressable {...rest}>
      <ThemedView style={styles.itemButton}>
        <ThemedText style={styles.itemButtonText}>
          {value}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemButton: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "orangered",
    backgroundColor: "orangered"
  },
  itemButtonText: {
    color: "#eee"
  },
});
