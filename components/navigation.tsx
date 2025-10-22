import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

type NavigationOptionType = {
  href: Href,
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string
};

const navigationRoutes: NavigationOptionType[] = [
  { href: "/", icon: "list-alt", label: "Dashboard" },
  { href: "/refuels-list", icon: "filter", label: "Refuels" },
  { href: "/services-list", icon: "wrench", label: "Services" },
  { href: "/settings", icon: "gear", label: "Settings" }
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
