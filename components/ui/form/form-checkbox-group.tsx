import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

export function FormCheckBoxGroup({ children }: { children: ReactNode }) {

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ThemedView style={styles.group}>
      <Pressable onPress={() => setIsOpen(!isOpen)}>
        <ThemedView style={styles.heading}>
          <ThemedText type="subtitle">{t('filtersTitle')}</ThemedText>
          <ThemedIcon name={`chevron-${isOpen ? 'down' : 'up'}`} style={styles.icon} />
        </ThemedView>
      </Pressable>
      { isOpen ? children : null }
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  group: {
    width: "80%",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  }
});
