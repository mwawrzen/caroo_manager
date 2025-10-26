import { checkStringIsInt } from "@/utils/check-int-string";
import i18n from "@/utils/i18n/i18n";
import {
  CapacityUnitEnum,
  DistanceUnitEnum,
  FuelEnum,
  FuelType,
  LangEnum,
  PriceUnitEnum,
  ServiceStatusEnum,
  StatusType
} from "@/utils/types";

export const fuelTypes: FuelType[] = [
  // { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'gas-pump', label: i18n.t(FuelEnum.PETROL), value: FuelEnum.PETROL },
  { icon: 'droplet', label: i18n.t(FuelEnum.DIESEL), value: FuelEnum.DIESEL },
  { icon: 'bolt-lightning', label: i18n.t(FuelEnum.ELECTRIC), value: FuelEnum.ELECTRIC },
];

export const altFuelTypes: FuelType[] = [
  { icon: 'fire', label: i18n.t(FuelEnum.GAS), value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: i18n.t(FuelEnum.ELECTRIC), value: FuelEnum.ELECTRIC },
];

export const allFuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: i18n.t(FuelEnum.PETROL), value: FuelEnum.PETROL },
  { icon: 'droplet', label: i18n.t(FuelEnum.DIESEL), value: FuelEnum.DIESEL },
  { icon: 'fire', label: i18n.t(FuelEnum.GAS), value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: i18n.t(FuelEnum.ELECTRIC), value: FuelEnum.ELECTRIC }
];

export const statusTypes: StatusType[] = [
  { icon: 'question', label: i18n.t(ServiceStatusEnum.PLANNED), value: ServiceStatusEnum.PLANNED },
  // { icon: 'calendar-days', label: 'Schedulded', value: ServiceStatusEnum.SCHEDULDED }
];

export const availableUnits = {
  priceUnits: [
    { label: PriceUnitEnum.EUR, value: PriceUnitEnum.EUR },
    { label: PriceUnitEnum.PLN, value: PriceUnitEnum.PLN },
    { label: PriceUnitEnum.USD, value: PriceUnitEnum.USD }
  ],
  distanceUnits: [
    { label: i18n.t(DistanceUnitEnum.KM), value: DistanceUnitEnum.KM },
    { label: i18n.t(DistanceUnitEnum.MI), value: DistanceUnitEnum.MI }
  ],
  capacityUnits: [
    { label: i18n.t(CapacityUnitEnum.L), value: CapacityUnitEnum.L },
    { label: i18n.t(CapacityUnitEnum.GAL), value: CapacityUnitEnum.GAL }
  ]
};

export const availableLanguages = [
  { name: LangEnum.ENGLISH, code: 'en' },
  { name: LangEnum.POLISH, code: 'pl' },
  { name: LangEnum.GERMAN, code: 'de' }
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
