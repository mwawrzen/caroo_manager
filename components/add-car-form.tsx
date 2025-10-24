import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import useCarStore from "@/store/car-store";
import { checkStringIsInt } from "@/utils/check-int-string";
import { Car, FuelEnum } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedIcon } from "./themed/themed-icon";

type FuelType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: FuelEnum;
};

type FuelTypeProps = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  isActive: boolean;
  setFuel: any; //!TEMP
};

const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'droplet', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

const altFuelTypes: FuelType[] = [
  { icon: 'fire', label: 'Gas', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

function FuelType({ icon, label, isActive, setFuel }: FuelTypeProps) {

  const opositeColorScheme = useOpositeColorScheme();
  const activeStyles = isActive ? { color: Colors[opositeColorScheme]['text'] } : {};

  return (
    <Pressable onPress={() => setFuel( label.toLowerCase() )} style={[
      styles.fuelTypeContainer,
      isActive ? {backgroundColor: "orangered"} : null
    ]}>
      <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
        <ThemedIcon name={icon} style={[ styles.fuelIcon, activeStyles]} />
        <ThemedText style={[styles.fuelLabel, activeStyles]}>{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export default function AddCarForm({ car= null }: { car?: Car | null }) {

  const title = car ? 'Edit car' : 'Add a new car';

  const router = useRouter();

  const { cars, addCar, editCar } = useCarStore();

  //! fix states default values
  const [carName, setCarName] = useState<string>(car?.name || '');
  const [carMileage, setCarMileage] = useState<string>(car?.mileage ? String(car.mileage) : '');
  const [fuel, setFuel] = useState<FuelEnum>(car?.fuel || FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | null>(car?.altFuel || null);

  const fuelTypeOptions = fuelTypes.map(({ icon, label }) => {
    return (
      <FuelType
        key={label}
        icon={icon}
        label={label}
        isActive={fuel === label.toLowerCase()}
        setFuel={setFuel}
      />
    );
  });

  //TODO: probably these are not alternative fuels :)
  const altFuelTypeOptions = altFuelTypes.map(({ icon, label }) => {
    return (
      <FuelType
        key={label}
        icon={icon}
        label={label}
        isActive={altFuel === label.toLowerCase()}
        setFuel={setAltFuel}
      />
    );
  });

  function handleAddCar() {
    addCar({
      name: carName,
      mileage: Number(carMileage),
      fuel,
      altFuel: altFuel || undefined
    });
    if (router.canGoBack())
      router.back();
  }

  function handleEditCar() {
    if (!car)
      return null;
    editCar(car.id, {
      name: carName,
      mileage: Number(carMileage),
      fuel,
      altFuel: altFuel || undefined
    });
    if (router.canGoBack())
      router.back();
  }

  function handleSetMileage(value: string) {
    if (value === "")
      setCarMileage("");
    else if(checkStringIsInt(value) && Number(value) > 0)
      setCarMileage(value);
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.heading}>{title}</ThemedText>
        <ThemedView style={styles.formContainer}>
          {/* name and mileage */}
          <ThemedTextInput
            style={styles.input}
            onChangeText={setCarName}
            value={carName}
            placeholder="Enter name"
          />
          <ThemedTextInput
            style={styles.input}
            onChangeText={handleSetMileage}
            value={carMileage}
            keyboardType="numeric"
            placeholder="Enter mileage"
          />
          {/* fuel type */}
          <ThemedText style={{ textAlign: "center" }}>Primary fuel</ThemedText>
          <ThemedView style={styles.fuelContainer}>
            {fuelTypeOptions}
          </ThemedView>
          <ThemedText style={{ textAlign: "center" }}>Alternative fuel</ThemedText>
          <ThemedView style={styles.fuelContainer}>
            {altFuelTypeOptions}
          </ThemedView>
            {
              altFuel ?
              <Pressable onPress={() => setAltFuel(null)}>
                <ThemedView
                  lightColor="orangered"
                  darkColor="#000"
                  style={styles.buttonContainer}
                >
                  <ThemedText lightColor={Colors['dark']['text']} style={styles.button}>
                    Remove
                  </ThemedText>
                </ThemedView>
              </Pressable> : null
            }
          {/* submit button */}
          {
            (carName.length && +carMileage >= 0) ?
            <Pressable onPress={car ? handleEditCar : handleAddCar}>
              <ThemedView style={styles.submitContainer}>
                <ThemedText lightColor={Colors['dark']['text']} style={styles.submit}>
                  Ready
                </ThemedText>
              </ThemedView>
            </Pressable> : null
          }
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 32,
    marginBottom: 30
  },
  formContainer: {
    gap: 12
  },
  input: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
  },
  fuelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  fuelTypeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: 10,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  fuelIcon: {
    fontSize: 22
  },
  fuelLabel: {
    fontSize: 14
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 20
  },
  button: {
    fontSize: 12,
    textTransform: "uppercase"
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 22,
    backgroundColor: "orangered"
  },
  submit: {
    fontSize: 22
  }
});
