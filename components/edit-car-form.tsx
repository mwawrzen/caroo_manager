import Form from "@/components/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { altFuelTypes, fuelTypes, getValidatedMileage } from "@/utils/data";
import { Car, FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./ui/button/remove-button";

export default function EditCarForm({ car }: { car: Car }) {

  const { t } = useTranslation();

  const router = useRouter();

  const { editCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const [carName, setCarName] = useState<string>(car.name);
  const [carMileage, setCarMileage] = useState<string>(String(car.mileage));
  const [fuel, setFuel] = useState<FuelEnum>(car.fuel);
  const [altFuel, setAltFuel] = useState<FuelEnum | undefined>(car.altFuel || undefined);

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

  function checkIsValidated(): boolean {
    if (carName.length < 3 || +carMileage < car.mileage)
      return false;
    return true;
  }

  return (
    <Form title={t('editCarButton')}>
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
      { altFuel ? <RemoveButton onPress={() => setAltFuel(undefined)} /> : null }
      {
        checkIsValidated() ?
        <Form.Submit onPress={handleEditCar} /> : null
      }
    </Form>
  );
};
