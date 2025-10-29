import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ListItemRowType } from "@/utils/types";
import { Href, Link, usePathname } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

type InfoListProps = {
  title: string;
  rowsData: ListItemRowType[];
  children?: ReactNode | null;
  href?: Href;
};

function ListItemRow({ rowData }: { rowData: ListItemRowType }) {

  if (!rowData.value)
    return null;

  return (
    // <ThemedView style={rowData.column ? styles.itemRowColumn : styles.itemRow}>
    <ThemedView style={styles.itemRow}>
      <ThemedText style={styles.itemLabel}>{rowData.label}:</ThemedText>
      <ThemedText style={styles.itemText}>{rowData.value}</ThemedText>
    </ThemedView>
  );
}

export default function ListItem({
  title,
  rowsData,
  children = null,
  href
}: InfoListProps) {

  const rows = rowsData.map(row =>
    <ListItemRow key={row.label} rowData={row} />
  );

  const pathname = usePathname();
  if (!href)
    href = pathname as Href;

  return (
    <ThemedView style={styles.itemContainer}>
      <Link href={href} asChild>
        <Pressable>
          { title.length ? <ThemedText style={styles.itemTitle}>{title}</ThemedText> : null }
          {rows}
        </Pressable>
      </Link>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderLeftWidth: 6,
    borderColor: "orangered",
  },
  itemTitle: {
    color: "orangered",
    fontSize: 26
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  itemRowColumn: {
    // alignItems: "center"
  },
  itemLabel: {

  },
  itemText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 16
  }
});
