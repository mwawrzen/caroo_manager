import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { menuRoutes } from "@/utils/data";
import { MenuOptionType } from "@/utils/types";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

function MenuOption({ href, icon, name }: MenuOptionType) {

  const { t } = useTranslation();

  return (
    <Link replace href={href} asChild>
      <Pressable style={styles.menuOption}>
        <ThemedView style={styles.menuOptionContainer}>
          <ThemedIcon name={icon} lightColor="orangered" style={styles.menuOptionIcon} />
          <ThemedText style={styles.menuOptionLabel}>{t(name)}</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

export default function Menu() {

  const menuOptions = menuRoutes.map(({ href, icon, name }: MenuOptionType, i: number) => (
    <MenuOption key={i} href={href} icon={icon} name={name} />
  ));

  return (
    <ThemedView style={styles.container}>
      {menuOptions}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 10
  },
  menuOption: {
    width: "100%",
    maxWidth: 600
  },
  menuOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "90%",
    marginHorizontal: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderLeftWidth: 6,
    borderColor: "orangered"
  },
  menuOptionIcon: {
    width: 34,
    fontSize: 24
  },
  menuOptionLabel: {
    marginBottom: 4,
    fontSize: 22
  },
});
