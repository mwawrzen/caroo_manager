import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import ListItem from "@/components/ui/list/list-item";
import { ListItemType } from "@/utils/types";
import { Href, Link } from "expo-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, ScrollView, StyleSheet } from "react-native";

type ListViewProps = {
  title: string;
  addHref: Href;
  data?: ListItemType[];
  node?: ReactNode;
  subheading?: ReactNode;
}

export default function ListView({
  title,
  addHref,
  data,
  node,
  subheading = null
}: ListViewProps) {

  const { t } = useTranslation();

  const items = data ? data.map(({ title, rows }: ListItemType, i) => (
    <ListItem key={i} title={title} rowsData={rows} />
  )) : node || [];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>{title}</ThemedText>
        <Link push href={addHref} asChild>
          <Pressable>
            <ThemedView style={styles.titleButtonContainer}>
              <ThemedIcon name="plus" style={styles.titleButtonIcon} />
              <ThemedText style={styles.titleButtonText}>{t('addButton')}</ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>
      { subheading }
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    width: "100%",
    maxWidth: 600
  },
  titleText: {

  },
  titleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "orangered"
  },
  titleButtonIcon: {
    fontSize: 18,
    color: "#eee"
  },
  titleButtonText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: "#eee"
  },
  list: {
    gap: 20,
    width: Dimensions.get('window').width,
    maxWidth: 600
  }
});
