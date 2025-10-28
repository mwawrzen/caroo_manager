import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { ListItemRowType } from "@/utils/types";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type InfoListProps = {
  title: string,
  rowsData: ListItemRowType[],
  children?: ReactNode | null
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

export default function ListItem({ title, rowsData, children = null }: InfoListProps) {

  const rows = rowsData.map(row =>
    <ListItemRow key={row.label} rowData={row} />
  );

  return (
    <ThemedView style={styles.itemContainer}>
      { title.length ? <ThemedText style={styles.itemTitle}>{title}</ThemedText> : null }
      {rows}
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
