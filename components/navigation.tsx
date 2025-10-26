import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { navigationRoutes } from "@/utils/data";
import { NavigationOptionType } from "@/utils/types";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

function NavigationOption({ href, icon, name }: NavigationOptionType) {

  const { t } = useTranslation();

  return (
    <Link href={href} asChild style={styles.option}>
      <Pressable>
        <ThemedIcon lightColor="orangered" name={icon} style={styles.icon} />
        <ThemedText lightColor="orangered" style={styles.label}>{t(name)}</ThemedText>
      </Pressable>
    </Link>
  );
}

export default function Navigation() {

  const navigationOptions = navigationRoutes.map(({ href, icon, name }: NavigationOptionType, i: number) => (
    <NavigationOption key={i} href={href} icon={icon} name={name} />
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
