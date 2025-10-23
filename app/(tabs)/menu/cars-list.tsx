import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { Car } from "@/utils/types";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

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

  const { currentCar, setCurrentCar } = useCarStore();

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

  function setCarAsDefault() {
    setCurrentCar(car.id);
  }

  return (
    <ThemedView key={car.id} style={styles.itemContainer}>
      <ThemedText style={styles.itemTitle}>{car.name}</ThemedText>
      {infoRows}
      <ThemedView style={styles.itemButtonGroup}>
        {
          currentCar && currentCar.id !== car.id ?
            <Pressable onPress={setCarAsDefault} style={{ width: "40%" }}>
              <ThemedView style={styles.itemButton}>
                <ThemedText style={styles.itemButtonText}>
                  Set as default
                </ThemedText>
              </ThemedView>
            </Pressable> :
            <ThemedView style={styles.defaultItemButton}>
              <ThemedText style={styles.defaultItemButtonText}>
                Default car
              </ThemedText>
            </ThemedView>
        }
        <Link href={{ pathname: './edit-car/[id]', params: { id: car.id } }} asChild>
          <Pressable style={{ width: "40%" }}>
            <ThemedView style={styles.itemButton}>
              <ThemedText style={styles.itemButtonText}>
                Edit car
              </ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

export default function CarsList() {

  const { cars } = useCarStore();

  const carItems = cars.map(car => <CarItem key={car.id} car={car} />);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>My cars</ThemedText>
        <Link href="./add-car" asChild>
          <Pressable>
            <ThemedView style={styles.titleButtonContainer}>
              <ThemedIcon name="plus" style={styles.titleButtonIcon} />
              <ThemedText style={styles.titleButtonText}>Add</ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10
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
  itemButtonGroup: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 10
  },
  itemButton: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "orangered",
    backgroundColor: "orangered"
  },
  itemButtonText: {
    color: "#eee"
  },
  defaultItemButton: {
    alignItems: "center",
    width: "40%",
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "orangered",
    borderRadius: 10,
    opacity: .4
  },
  defaultItemButtonText: {
    color: "orangered"
  }
});
