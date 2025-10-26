import Form from "@/components/form";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { altFuelTypes, fuelTypes, getValidatedMileage } from "@/utils/data";
import { FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet } from "react-native";

export default function AddCarForm() {

  const { t } = useTranslation();

  const router = useRouter();

  const { addCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const [carName, setCarName] = useState<string>('');
  const [carMileage, setCarMileage] = useState<string>('');
  const [fuel, setFuel] = useState<FuelEnum>(FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | null>(null);

  const fuelTypeOptions = fuelTypes.map(({ icon, value }, i) => {
    return (
      <Form.Radio
        key={i}
        icon={icon}
        label={t(value)}
        value={value}
        isActive={fuel === value}
        onPress={setFuel}
      />
    );
  });

  const altFuelTypeOptions = altFuelTypes.map(({ icon, value }, i) => {
    return (
      <Form.Radio
        key={i}
        icon={icon}
        label={t(value)}
        value={value}
        isActive={altFuel === value}
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

  function checkIsValidated(): boolean {
    if (carName.length < 3 || +carMileage < 1)
      return false;
    return true;
  }

  return (
    <Form title={t('addCarFormTitle')}>
      <Form.Input
        value={carName}
        onChangeText={setCarName}
        placeholder={t('enterName')}
      />
      <Form.InputUnit
        value={carMileage}
        onChangeText={(val: string) => setCarMileage(String(getValidatedMileage(val)))}
        placeholder={t('enterMileage')}
        unit={distanceUnit}
        keyboardType="numeric"
      />
      {/* fuel type */}
      <Form.RadioGroup title={t('primaryFuelTitle')}>
        {fuelTypeOptions}
      </Form.RadioGroup>
      <Form.RadioGroup title={t('alternativeFuelTitle')}>
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
        checkIsValidated() ?
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
