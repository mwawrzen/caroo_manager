import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { altFuelTypes, fuelTypes, MAX_MILEAGE } from "@/utils/data";
import { FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./ui/button/remove-button";

export default function AddCarForm() {

  const { t } = useTranslation();

  const router = useRouter();

  const { addCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const [name, setName] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  const [fuel, setFuel] = useState<FuelEnum>(FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | undefined>();

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
      name: name,
      mileage: Number(mileage),
      fuel,
      altFuel: altFuel || undefined
    });
    if (router.canGoBack())
      router.back();
  }

  function checkIsValidated(): boolean {
    if (
      name.length < 3 ||
      Number(mileage) < 1 ||
      Number(mileage) > MAX_MILEAGE
    )
      return false;
    return true;
  }

  return (
    <Form title={t('addCarFormTitle')}>
      <Form.Input
        value={name}
        onChangeText={setName}
        placeholder={t('enterName')}
      />
      <Form.Input
        value={mileage}
        onChangeText={setMileage}
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
      { checkIsValidated() ? <Form.Submit onPress={handleAddCar} /> : null }
    </Form>
  );
};
