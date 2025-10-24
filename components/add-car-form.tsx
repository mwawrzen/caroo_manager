import Form from "@/components/form";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import { checkStringIsInt } from "@/utils/check-int-string";
import { FuelEnum } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

type FuelType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: FuelEnum;
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

export default function AddCarForm() {

  const router = useRouter();

  const { addCar } = useCarStore();

  //! fix states default values
  const [carName, setCarName] = useState<string>('');
  const [carMileage, setCarMileage] = useState<string>('');
  const [fuel, setFuel] = useState<FuelEnum>(FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | null>(null);

  const fuelTypeOptions = fuelTypes.map(({ icon, label }) => {
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        isActive={fuel === label.toLowerCase()}
        onPress={setFuel}
      />
    );
  });

  //TODO: probably these are not alternative fuels :)
  const altFuelTypeOptions = altFuelTypes.map(({ icon, label }) => {
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        isActive={altFuel === label.toLowerCase()}
        onPress={setAltFuel}
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

  function handleSetMileage(value: string) {
    if(Number(value) >= 999999)
      setCarMileage("999999")
    else if (value === "")
      setCarMileage("");
    else if(checkStringIsInt(value) && Number(value) > 0)
      setCarMileage(value);
  }

  return (
    <Form title="Add a car">
      <Form.Input
        value={carName}
        onChangeText={setCarName}
        placeholder="Enter name"
      />
      <Form.InputUnit
        value={carMileage}
        onChangeText={handleSetMileage}
        placeholder="Enter mileage"
        unit="Km"
        keyboardType="numeric"
      />
      {/* fuel type */}
      <Form.RadioGroup title="Primary fuel">
        {fuelTypeOptions}
      </Form.RadioGroup>
      <Form.RadioGroup title="Alternative fuel">
        {altFuelTypeOptions}
      </Form.RadioGroup>
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
      {
        (carName.length && +carMileage >= 0) ?
        <Form.Submit onPress={handleAddCar} /> : null
      }
    </Form>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 20
  },
  button: {
    fontSize: 12,
    textTransform: "uppercase"
  }
});
