import Form from "@/components/form";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import { altFuelTypes, fuelTypes, getValidatedMileage } from "@/utils/data";
import { Car, FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function EditCarForm({ car }: { car: Car }) {

  const router = useRouter();

  const { editCar } = useCarStore();

  const [carName, setCarName] = useState<string>(car.name);
  const [carMileage, setCarMileage] = useState<string>(String(car.mileage));
  const [fuel, setFuel] = useState<FuelEnum>(car.fuel);
  const [altFuel, setAltFuel] = useState<FuelEnum | undefined>(car.altFuel || undefined);

  const fuelTypeOptions = fuelTypes.map(({ icon, label, value }) => {
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        value={value}
        isActive={fuel === value}
        onPress={setFuel}
      />
    );
  });

  const altFuelTypeOptions = altFuelTypes.map(({ icon, label, value }) => {
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        value={value}
        isActive={altFuel === value}
        onPress={setAltFuel}
      />
    );
  });

  function handleEditCar() {
    editCar(car.id, {
      name: carName,
      mileage: Number(carMileage),
      fuel,
      altFuel
    });
    if (router.canGoBack())
      router.back();
  }

  return (
    <Form title="Edit car">
      <Form.Input
        value={carName}
        onChangeText={setCarName}
        placeholder="Enter name"
      />
      <Form.InputUnit
        value={carMileage}
        onChangeText={(val: string) => setCarMileage(getValidatedMileage(val))}
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
        <Form.Submit onPress={handleEditCar} /> : null
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
