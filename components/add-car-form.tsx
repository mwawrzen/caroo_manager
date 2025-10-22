import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-text-input";
import { ThemedView } from "@/components/themed-view";
import useCarStore from "@/store/car-store";
import { FuelEnum } from "@/utils/types";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

type FuelType = {
  icon: keyof typeof FontAwesome.glyphMap,
  label: string,
  value: FuelEnum;
};

type FuelTypeProps = {
  icon: keyof typeof FontAwesome.glyphMap,
  label: string,
  isActive: boolean;
  setFuel: any; //!TEMP
};

const fuelTypes: FuelType[] = [
  { icon: 'filter', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'filter', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'filter', label: 'Gas', value: FuelEnum.GAS },
];

function FuelType({ icon, label, isActive, setFuel }: FuelTypeProps) {

  return (
    <Pressable onPress={() => setFuel( label.toLowerCase() )} style={[
      styles.fuelTypeContainer,
      isActive ? {backgroundColor: "orangered"} : null
    ]}>
      <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
        <FontAwesome name={icon} style={styles.fuelIcon} />
        <ThemedText style={styles.fuelLabel}>{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export default function AddCarForm() {

  const { cars, addCar } = useCarStore();

  const [carName, setCarName] = useState<string>('');
  const [carMileage, setCarMileage] = useState<string>('');
  const [fuel, setFuel] = useState<FuelEnum>(FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | null>(null);

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
  const altFuelTypeOptions = fuelTypes.map(({ icon, label }) => {
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

  function createNewCar() {
    addCar({
      name: carName,
      mileage: Number(carMileage),
      fuel,
      altFuel: altFuel || undefined
    });
  }

  function setNumericMileageValue(value: string) {
    const onlyNumericMileage: string = value.replace(/[^0-9]/g, '');
    setCarMileage(onlyNumericMileage);
  }

  useEffect(() => {
    console.log( cars );
  }, [cars]);

  return (
    <ScrollView>
      <ThemedView style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
        <ThemedText style={styles.heading}>Add a new car</ThemedText>
        <ThemedView style={styles.formContainer}>
          {/* name and mileage */}
          <ThemedTextInput
            style={styles.input}
            onChangeText={setCarName}
            value={carName}
            placeholder="Enter name"
            placeholderTextColor="#eeeeeeaa"
          />
          <ThemedTextInput
            style={styles.input}
            onChangeText={setNumericMileageValue}
            value={carMileage}
            keyboardType="numeric"
            placeholder="Enter mileage"
            placeholderTextColor="#eeeeeeaa"
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
              <Pressable onPress={() => setAltFuel(null)} style={styles.buttonContainer}>
                <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
                  <ThemedText style={styles.button}>Remove</ThemedText>
                </ThemedView>
              </Pressable> : null
            }
          {/* submit button */}
          {
            (carName.length && +carMileage >= 0) ?
            <Pressable onPress={createNewCar} style={styles.submitContainer}>
              <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
                <ThemedText style={styles.submit}>Ready</ThemedText>
              </ThemedView>
            </Pressable> : null
          }
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    marginBottom: 30
  },
  formContainer: {
    gap: 12,
    width: "70%"
  },
  input: {
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "orangered",
    fontSize: 20
  },
  fuelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    fontSize: 22,
    color: "#eee"
  },
  fuelLabel: {
    fontSize: 14
  },
  buttonContainer: {
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 20,
    backgroundColor: "#000"
  },
  button: {
    fontSize: 12,
    textTransform: "uppercase"
  },
  submitContainer: {
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
