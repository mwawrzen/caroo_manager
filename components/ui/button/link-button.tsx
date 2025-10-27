import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Link, LinkProps } from "expo-router";
import { Pressable, PressableProps, StyleSheet } from "react-native";

type ActionButtonProps = LinkProps & {
  value: string;
  style?: PressableProps['style'];
};

export default function LinkButton({ value, style, ...rest }: ActionButtonProps) {
  return (
    <Link asChild {...rest}>
      <Pressable style={style}>
        <ThemedView style={styles.itemButton}>
          <ThemedText style={styles.itemButtonText}>
            {value}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
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
