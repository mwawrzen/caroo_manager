import Form from "@/components/form";
import useCarStore from "@/store/car-store";
import { checkStringIsDouble } from "@/utils/check-double-string";
import { getValidatedMileage } from "@/utils/data";
import { CapacityUnitEnum, DistanceUnitEnum, FuelEnum, FuelType, PriceUnitEnum } from "@/utils/types";
import { useRouter } from "expo-router";
import { useState } from "react";

const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'droplet', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'fire', label: 'Gas', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC }
];

export default function AddRefuel() {

  const { currentCar, addRefuel } = useCarStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [unitPrice, setUnitPrice] = useState<string>(""); //! number
  const [fuelAmount, setFuelAmount] = useState<string>(""); //! number
  const [fuelType, setFuelType] = useState<FuelEnum>(currentCar.fuel); //! current car
  const [mileage, setMileage] = useState<string>(String(currentCar.mileage)); //!  number
  const [isFullyRefueled, setIsFullyRefueled] = useState<boolean>(true);
  const [note, setNote] = useState<string>('');

  const statusTypeOptions = fuelTypes.map(({ icon, label, value }, i) => {
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
    <Form title="Add refuel">
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.Checkbox
        label="Fully refueled"
        onPress={() => setIsFullyRefueled(!isFullyRefueled)}
        checked={isFullyRefueled}
      />
      <Form.InputUnit
        value={unitPrice}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setUnitPrice(val) : {}}
        placeholder="Enter unit price"
        keyboardType="numeric"
        unit={PriceUnitEnum.USD}
      />
      <Form.InputUnit
        value={fuelAmount}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setFuelAmount(val) : {}}
        placeholder="Enter amount of fuel"
        keyboardType="numeric"
        unit={CapacityUnitEnum.L}
      />
      <Form.InputUnit
        value={mileage}
        onChangeText={(val: string) => setMileage(getValidatedMileage(val))}
        placeholder="Enter mileage"
        keyboardType="numeric"
        unit={DistanceUnitEnum.KM}
      />
      <Form.Input
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />
      { checkIsValidated() ? <Form.Submit onPress={handleAddRefuel} /> : null }
    </Form>
  );
}
