import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { altFuelTypes, fuelTypes, MAX_MILEAGE } from "@/utils/data";
import { Car, FormInputTypeEnum, FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./ui/button/remove-button";

export default function EditCarForm({ car }: { car: Car }) {

  const { t } = useTranslation();

  const router = useRouter();

  const { editCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const [name, setName] = useState<string>(car.name);
  const [mileage, setMileage] = useState<string>(String(car.mileage));
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
      name: name,
      mileage: Number(mileage),
      fuel,
      altFuel
    });
    if (router.canGoBack())
      router.back();
  }

  function checkIsValidated(): boolean {
    if (
      name.length < 3 ||
      Number(mileage) < car.mileage ||
      Number(mileage) > MAX_MILEAGE
    )
      return false;
    return true;
  }

  return (
    <Form title={t('editCarButton')}>
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
        type={FormInputTypeEnum.INT}
      />
      <Form.RadioGroup title={t('primaryFuelTitle')}>
        {fuelTypeOptions}
      </Form.RadioGroup>
      <Form.RadioGroup title={t('alternativeFuelTitle')}>
        {altFuelTypeOptions}
      </Form.RadioGroup>
      { altFuel ? <RemoveButton onPress={() => setAltFuel(undefined)} /> : null }
      { checkIsValidated() ? <Form.Submit onPress={handleEditCar} /> : null }
    </Form>
  );
};
