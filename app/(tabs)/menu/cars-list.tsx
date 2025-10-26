import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { Car, InfoRowType } from "@/utils/types";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

function CarItem({ car }: { car: Car }) {

  const { t } = useTranslation();

  const { currentCar, setCurrentCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const { mileage, fuel, altFuel, refuels, services } = car;

  const infoRowsData: InfoRowType[] = [
    { value: `${mileage} ${distanceUnit}`, label: t('savedMileageItem') },
    { value: fuel, label: t('primaryFuelTitle') },
    { value: altFuel ? String(altFuel) : null, label: t('alternativeFuelTitle') },
    { value: String(refuels.length), label: t('refulesNumItem') },
    { value: String(services.length), label: t('servicesNumItem') }
  ]

  function setCarAsDefault() {
    setCurrentCar(car.id);
  }

  return (
    <InfoList title={car.name} rowsData={infoRowsData}>
      <ThemedView style={styles.itemButtonGroup}>
        {
          currentCar && currentCar.id !== car.id ?
            <Pressable onPress={setCarAsDefault} style={{ width: "40%" }}>
              <ThemedView style={styles.itemButton}>
                <ThemedText style={styles.itemButtonText}>
                  {t('setDefaultCarButton')}
                </ThemedText>
              </ThemedView>
            </Pressable> :
            <ThemedView style={styles.defaultItemButton}>
              <ThemedText style={styles.defaultItemButtonText}>
                {t('defaultCarButton')}
              </ThemedText>
            </ThemedView>
        }
        <Link href={{ pathname: './edit-car/[id]', params: { id: car.id } }} asChild>
          <Pressable style={{ width: "40%" }}>
            <ThemedView style={styles.itemButton}>
              <ThemedText style={styles.itemButtonText}>
                {t('editCarButton')}
              </ThemedText>
            </ThemedView>
          </Pressable>
        </Link>
      </ThemedView>
    </InfoList>
  );
}

export default function CarsList() {

  const { t } = useTranslation();

  const { cars } = useCarStore();

  const carItems = cars.map(car => <CarItem key={car.id} car={car} />);

  return (
    <ListView title={t('myCarsItem')} addHref="./add-car" items={carItems} />
  );
};

const styles = StyleSheet.create({
  itemButtonGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginBottom: 10
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
