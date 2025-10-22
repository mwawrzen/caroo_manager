import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FontAwesome } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

type NavigationOptionType = {
  href: Href,
  icon: keyof typeof FontAwesome.glyphMap,
  label: string
};

const navigationRoutes: NavigationOptionType[] = [
  { href: "/", icon: "dashboard", label: "Dashboard" },
  { href: "/refuels-list", icon: "filter", label: "Refuels" },
  { href: "/services-list", icon: "wrench", label: "Services" },
  { href: "/settings", icon: "gear", label: "Settings" }
];

function NavigationOption({ href, icon, label }: NavigationOptionType) {
  return (
    <Link href={href} asChild style={styles.option}>
      <Pressable>
        <FontAwesome name={icon} style={styles.icon} />
        <ThemedText style={styles.label}>{label}</ThemedText>
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
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    margin: 20
  },
  option: {
    alignItems: "center",
    width: 70,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "orangered"
  },
  icon: {
    fontSize: 28,
    color: "#eee"
  },
  label: {
    fontSize: 10
  }
});
