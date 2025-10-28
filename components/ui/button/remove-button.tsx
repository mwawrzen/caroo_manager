import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { Pressable, PressableProps, StyleSheet } from "react-native";

type RemoveButtonProps = PressableProps;

export default function RemoveButton({ ...rest }: RemoveButtonProps) {

  const { t } = useTranslation();

  return (
    <Pressable {...rest}>
      <ThemedView
        lightColor="orangered"
        darkColor="#000"
        style={styles.buttonContainer}
      >
        <ThemedText lightColor={Colors['dark']['text']} style={styles.button}>
          {t('removeButton')}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 20
  },
  button: {
    fontSize: 12,
    textTransform: "uppercase"
  }
});
