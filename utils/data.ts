import { checkStringIsInt } from "./check-int-string";
import { CapacityUnitEnum, DistanceUnitEnum, FuelEnum, FuelType, LangEnum, PriceUnitEnum } from "./types";

export const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'droplet', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

export const altFuelTypes: FuelType[] = [
  { icon: 'fire', label: 'Gas', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC },
];

export const availableUnits = {
  priceUnits: [
    { label: PriceUnitEnum.USD, value: PriceUnitEnum.USD },
    { label: PriceUnitEnum.PLN, value: PriceUnitEnum.PLN },
    { label: PriceUnitEnum.EUR, value: PriceUnitEnum.EUR }
  ],
  distanceUnits: [
    { label: 'KILOMETERS', value: DistanceUnitEnum.KM },
    { label: 'MILES', value: DistanceUnitEnum.MI }
  ],
  capacityUnits: [
    { label: 'LITRES', value: CapacityUnitEnum.L },
    { label: 'GALLONS', value: CapacityUnitEnum.GAL }
  ]
};

export const availableLanguages = [
  LangEnum.ENGLISH,
  LangEnum.POLISH,
  LangEnum.GERMAN
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
