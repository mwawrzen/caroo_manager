import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

type FormSubmitType = {
  onPress: () => void;
};

export default function FormSubmit({ onPress }: FormSubmitType) {

  const { t } = useTranslation();

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.submitContainer}>
        <ThemedText lightColor={Colors['dark']['text']} style={styles.submit}>
          {t('readyButton')}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 22,
    backgroundColor: "orangered"
  },
  submit: {
    fontSize: 22
  }
});
