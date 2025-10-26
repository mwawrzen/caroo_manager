import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import i18n from "@/utils/i18n/i18n";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

type MenuOptionType = {
  href: any, //! TEMP
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string
};

const menuRoutes: MenuOptionType[] = [
  { href: "/menu/cars-list", icon: "car", label: i18n.t('myCarsItem') },
  { href: "/menu/preferences", icon: "gears", label: i18n.t('preferencesItem') }
];

function MenuOption({ href, icon, label }: MenuOptionType) {
  return (
    <Link href={href} asChild>
      <Pressable>
        <ThemedView style={styles.menuOptionContainer}>
          <ThemedIcon name={icon} lightColor="orangered" style={styles.menuOptionIcon} />
          <ThemedText style={styles.menuOptionLabel}>{label}</ThemedText>
        </ThemedView>
      </Pressable>
    </Link>
  );
}

export default function Menu() {

  const menuOptions = menuRoutes.map(({ href, icon, label }: MenuOptionType) => (
    <MenuOption key={String(label)} href={href} icon={icon} label={label} />
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
    gap: 10
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
    borderColor: "orangered",
    // borderRadius: 20
    // backgroundColor: "darkgreen"
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
