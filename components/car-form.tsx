import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { altFuelTypes, fuelTypes, MAX_MILEAGE } from "@/utils/data";
import { Car, FormInputTypeEnum, FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./ui/button/remove-button";

export default function CarForm({ car = null }: { car?: Car | null }) {

  const { t } = useTranslation();

  const router = useRouter();

  const { addCar, editCar, removeCar } = useCarStore();
  const { distanceUnit } = usePreferencesStore();

  const [name, setName] = useState<string>(car?.name || '');
  const [mileage, setMileage] = useState<string>(String(car?.mileage || ''));
  const [fuel, setFuel] = useState<FuelEnum>(car?.fuel || FuelEnum.PETROL);
  const [altFuel, setAltFuel] = useState<FuelEnum | undefined>(car?.altFuel || undefined);

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
        onPress={handleAltFuelRadio}
      />
    );
  });

  function handleAltFuelRadio(fuel: FuelEnum) {
    if (altFuel === fuel)
      setAltFuel(undefined);
    else
      setAltFuel(fuel);
  }

  function handleRemoveCar() {
    if (!car)
      return null;
    removeCar(car.id);
    router.navigate('/menu/cars-list');
  }

  function handleSubmit() {
    const payload = {
      name: name,
      mileage: Number(mileage),
      fuel,
      altFuel
    };

    if (car)
      editCar(car.id, payload);
    else
      addCar(payload);

    router.navigate('/menu/cars-list');
  }

  function checkIsValidated(): boolean {
    if (
      name.length < 3 ||
      Number(mileage) < (car?.mileage || 1) ||
      Number(mileage) > MAX_MILEAGE
    )
      return false;
    return true;
  }

  return (
    <Form title={t(car ? 'editCarButton' : 'addCarFormTitle')}>
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
      { car ? <RemoveButton onPress={handleRemoveCar} /> : null }
      { checkIsValidated() ? <Form.Submit onPress={handleSubmit} /> : null }
    </Form>
  );
};
