import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { InfoRowType } from "@/utils/types";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";

type InfoListProps = {
  title: string,
  rowsData: InfoRowType[],
  children?: ReactNode | null
};

function InfoListRow({ rowData }: { rowData: InfoRowType }) { //! TEMP

  if (!rowData.value)
    return null;

  return (
    <ThemedView style={styles.itemRow}>
      <ThemedText style={styles.itemLabel}>{rowData.label}</ThemedText>
      <ThemedText style={styles.itemText}>{rowData.value}</ThemedText>
    </ThemedView>
  );
}

export default function InfoList({ title, rowsData, children = null }: InfoListProps) {

  const rows = rowsData.map(row =>
    <InfoListRow key={row.label} rowData={row} />
  );

  return (
    <ThemedView style={styles.itemContainer}>
      <ThemedText style={styles.itemTitle}>{title}</ThemedText>
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
    borderColor: "orangered"
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
  itemLabel: {

  },
  itemText: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18
  }
});
