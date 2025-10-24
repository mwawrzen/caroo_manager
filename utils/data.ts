import { checkStringIsInt } from "./check-int-string";
import { FuelEnum, FuelType } from "./types";

export const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'droplet', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

export const altFuelTypes: FuelType[] = [
  { icon: 'fire', label: 'Gas', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

export function getValidatedMileage(value: string): string {
  if(Number(value) >= 999999)
    return "999999"
  if (value === '')
    return '';
  if(checkStringIsInt(value) && Number(value) > 0)
    return value;
  return '';
};
