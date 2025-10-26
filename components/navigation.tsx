import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import i18n from "@/utils/i18n/i18n";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

type NavigationOptionType = {
  href: any, //! TEMP
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string
};

const navigationRoutes: NavigationOptionType[] = [
  { href: "/", icon: "chart-simple", label: i18n.t('dashboardNav')},
  { href: "/refuels-list", icon: "gas-pump", label: i18n.t('refuelsNav') },
  { href: "/services-list", icon: "wrench", label: i18n.t('servicesNav') },
  { href: "/menu", icon: "list", label: i18n.t('menuNav') }
];

function NavigationOption({ href, icon, label }: NavigationOptionType) {
  return (
    <Link href={href} asChild style={styles.option}>
      <Pressable>
        <ThemedIcon lightColor="orangered" name={icon} style={styles.icon} />
        <ThemedText lightColor="orangered" style={styles.label}>{label}</ThemedText>
      </Pressable>
    </Link>
  );
}

export default function Navigation() {

  const navigationOptions = navigationRoutes.map(({ href, icon, label }: NavigationOptionType) => (
    <NavigationOption key={label as string} href={href} icon={icon} label={label} />
  ));

  return (
    <ThemedView style={styles.container}>
      {navigationOptions}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    gap: 8,
    width: "100%",
    margin: 20
  },
  option: {
    alignItems: "center",
    width: "18%",
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "orangered"
  },
  icon: {
    fontSize: 22
  },
  label: {
    fontSize: 10
  }
});
