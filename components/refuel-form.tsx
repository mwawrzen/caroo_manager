import Form from "@/components/ui/form/form";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { checkIsMileageInScopeByDate } from "@/utils/car-store-utils";
import { allFuelTypes } from "@/utils/data";
import { AddRefuelType, FormInputTypeEnum, FuelEnum, Refuel } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import RemoveButton from "./ui/button/remove-button";

export default function RefuelForm({ refuel = null }: { refuel?: Refuel | null }) {

  const { t } = useTranslation();

  const { currentCar, addRefuel, editRefuel, removeRefuel } = useCarStore();
  const { priceUnit, capacityUnit, distanceUnit } = usePreferencesStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [unitPrice, setUnitPrice] = useState<string>(String(refuel?.unitPrice || ''));
  const [date, setDate] = useState<Date>(refuel?.date || new Date(Date.now()));
  const [fuelAmount, setFuelAmount] = useState<string>(String(refuel?.amountOfFuel || ''));
  const [fuelType, setFuelType] = useState<FuelEnum>(refuel?.fuel || currentCar.fuel);
  const [mileage, setMileage] = useState<string>(String(refuel?.mileage || currentCar.mileage));
  const [isFullyRefueled, setIsFullyRefueled] = useState<boolean>(refuel ? refuel.fullyRefueled : true);
  const [note, setNote] = useState<string>(refuel?.note || '');

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

  function handleRemove() {
    if (!currentCar || !refuel)
      return null;
    removeRefuel(currentCar.id, refuel.id);
    router.navigate('/refuels-list');
  }

  function handleSubmit() {
    if (!currentCar)
      return;

    const payload: AddRefuelType = {
      unitPrice: Number(unitPrice),
      amountOfFuel: Number(fuelAmount),
      date,
      fuel: fuelType,
      mileage: Number(mileage),
      fullyRefueled: isFullyRefueled,
      note
    };

    if (refuel)
      editRefuel(currentCar.id, refuel.id, payload);
    else
      addRefuel(currentCar.id, payload);

    router.navigate('/refuels-list');
  }

  /*
    założenia:

      przebieg musi się mieścić w zakresie przebiegu najbliższego pożniejszego tankowania,
      a najbliższego poprzedniego tankowania

  */

  function checkIsValidated(): boolean {
    if (
      !currentCar ||
      // Number(unitPrice) <= 0 ||
      // Number(fuelAmount) <= 0 ||
      // Number(mileage) > MAX_MILEAGE ||
      !checkIsMileageInScopeByDate(currentCar.refuels, date, Number(mileage), fuelType)
    )
      return false;
    return true;
  }

  return (
    <Form title={t(refuel ? 'editRefuelButton' : 'addRefuelLabel')}>
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.DateInput currentDate={date} setCurrentDate={setDate} />
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
      { refuel ? <RemoveButton onPress={handleRemove} /> : null }
      { checkIsValidated() ? <Form.Submit onPress={handleSubmit} /> : null }
    </Form>
  );
}
