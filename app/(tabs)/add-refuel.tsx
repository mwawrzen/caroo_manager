import Form from "@/components/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { checkStringIsDouble } from "@/utils/check-double-string";
import { allFuelTypes, getValidatedMileage } from "@/utils/data";
import { FuelEnum } from "@/utils/types";
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

  const [unitPrice, setUnitPrice] = useState<string>(""); //! number
  const [fuelAmount, setFuelAmount] = useState<string>(""); //! number
  const [fuelType, setFuelType] = useState<FuelEnum>(currentCar.fuel); //! current car
  const [mileage, setMileage] = useState<string>(String(currentCar.mileage)); //!  number
  const [isFullyRefueled, setIsFullyRefueled] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');

  const statusTypeOptions = allFuelTypes.map(({ icon, label, value }, i) => {
    if (![currentCar.fuel, currentCar.altFuel].includes(value))
      return null;
    return (
      <Form.Radio
        key={i}
        icon={icon}
        label={label}
        value={value}
        isActive={fuelType === label.toLowerCase()}
        onPress={setFuelType}
      />
    );
  });

  function handleAddRefuel() {
    //TODO form validation
    if (!currentCar)
      return null;
    addRefuel(currentCar.id, {
      unitPrice: Number(unitPrice),
      amountOfFuel: Number(fuelAmount),
      fuel: fuelType,
      mileage: Number(mileage),
      fullyRefueled: isFullyRefueled,
      note
    });
    setIsFullyRefueled(true);
    if (router.canGoBack())
      router.back();
  }

  function checkIsValidated(): boolean {
    if (!currentCar)
      return false;
    if (
      Number(unitPrice) <= 0 ||
      Number(fuelAmount) <= 0 ||
      Number(mileage) <= currentCar.mileage
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
      <Form.InputUnit
        value={unitPrice}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setUnitPrice(val) : {}}
        placeholder={t('enterUnitPrice')}
        keyboardType="numeric"
        unit={priceUnit}
      />
      <Form.InputUnit
        value={fuelAmount}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setFuelAmount(val) : {}}
        placeholder={t('enterAmountOfFuel')}
        keyboardType="numeric"
        unit={capacityUnit}
      />
      <Form.InputUnit
        value={mileage}
        onChangeText={(val: string) => setMileage(getValidatedMileage(val))}
        placeholder={t('enterMileage')}
        keyboardType="numeric"
        unit={distanceUnit}
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
