import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { Car } from "@/utils/types";
import { ScrollView, StyleSheet } from "react-native";

type InfoRowType = {
  value: string | null;
  label: string;
};

function CarInfoRow({ infoRowData }: { infoRowData: InfoRowType }) { //! TEMP

  if (!infoRowData.value)
    return null;

  return (
    <ThemedView style={styles.itemRow}>
      <ThemedText style={styles.itemLabel}>{infoRowData.label}</ThemedText>
      <ThemedText style={styles.itemText}>{infoRowData.value}</ThemedText>
    </ThemedView>
  );
}

function CarItem({ car }: { car: Car }) {

  const { mileage, fuel, altFuel, refuels, services } = car;
  const infoRowsData: InfoRowType[] = [
    { value: `${mileage} km`, label: "Last saved mileage:" },
    { value: fuel, label: "Main fuel:" },
    { value: altFuel ? String(altFuel) : null, label: "Alternative fuel:" },
    { value: String(refuels.length), label: "Number of refuels:" },
    { value: String(services.length), label: "Number of services:" }
  ]

  const infoRows = infoRowsData.map(data => (
    <CarInfoRow key={data.label} infoRowData={data} />
  ));

  return (
    <ThemedView key={car.id} style={styles.itemContainer}>
      <ThemedText style={styles.itemTitle}>{car.name}</ThemedText>
      {infoRows}
    </ThemedView>
  );
}

export default function CarsList() {

  const { cars } = useCarStore();

  const carItems = cars.map(car => <CarItem key={car.id} car={car} />);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>My cars</ThemedText>
      <ScrollView contentContainerStyle={styles.list}>
        {carItems}
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    paddingBottom: 10
  },
  list: {
    gap: 20
  },
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
  },
});
