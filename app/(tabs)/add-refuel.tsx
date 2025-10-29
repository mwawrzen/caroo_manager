import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { allFuelTypes, MAX_MILEAGE } from "@/utils/data";
import { FormInputTypeEnum, FuelEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddRefuel() {

  const { t } = useTranslation();

  const { currentCar, addRefuel } = useCarStore();
  const { priceUnit, capacityUnit, distanceUnit } = usePreferencesStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [unitPrice, setUnitPrice] = useState<string>('');
  const [fuelAmount, setFuelAmount] = useState<string>('');
  const [fuelType, setFuelType] = useState<FuelEnum>(currentCar.fuel);
  const [mileage, setMileage] = useState<string>(String(currentCar.mileage));
  const [isFullyRefueled, setIsFullyRefueled] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');

  const statusTypeOptions = allFuelTypes.map(({ icon, value }, i) => {
    if (![currentCar.fuel, currentCar.altFuel].includes(value))
      return null;
    return (
      <Form.Radio
        key={i}
        icon={icon}
        label={t(value)}
        value={value}
        isActive={fuelType === value}
        onPress={setFuelType}
      />
    );
  });

  function handleAddRefuel() {
    if (!currentCar)
      return;
    addRefuel(currentCar.id, {
      unitPrice: Number(unitPrice),
      amountOfFuel: Number(fuelAmount),
      fuel: fuelType,
      mileage: Number(mileage),
      fullyRefueled: isFullyRefueled,
      note
    });
    setIsFullyRefueled(true);
    router.navigate('/refuels-list');
  }

  function checkIsValidated(): boolean {
    if (
      !currentCar ||
      Number(unitPrice) <= 0 ||
      Number(fuelAmount) <= 0 ||
      Number(mileage) <= currentCar.mileage ||
      Number(mileage) > MAX_MILEAGE
    )
      return false;
    return true;
  }

  return (
    <Form title={t('addRefuelLabel')}>
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.Checkbox
        label={t('fullyRefueledItem')}
        onPress={() => setIsFullyRefueled(!isFullyRefueled)}
        checked={isFullyRefueled}
      />
      <Form.Input
        value={unitPrice}
        onChangeText={setUnitPrice}
        placeholder={t('enterUnitPrice')}
        keyboardType="numeric"
        unit={priceUnit}
        type={FormInputTypeEnum.FLOAT}
      />
      <Form.Input
        value={fuelAmount}
        onChangeText={setFuelAmount}
        placeholder={t('enterAmountOfFuel')}
        keyboardType="numeric"
        unit={capacityUnit}
        type={FormInputTypeEnum.FLOAT}
      />
      <Form.Input
        value={mileage}
        onChangeText={setMileage}
        placeholder={t('enterMileage')}
        keyboardType="numeric"
        unit={distanceUnit}
        type={FormInputTypeEnum.INT}
      />
      <Form.Input
        value={note}
        onChangeText={setNote}
        placeholder={t('enterNote')}
      />
      { checkIsValidated() ? <Form.Submit onPress={handleAddRefuel} /> : null }
    </Form>
  );
}
