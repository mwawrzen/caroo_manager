import {
  CapacityUnitEnum,
  DistanceUnitEnum,
  FuelEnum,
  FuelType,
  LangEnum,
  MenuOptionType,
  NavigationOptionType,
  PriceUnitEnum,
  ServiceStatusEnum,
  StatusType
} from "@/utils/types";

export const MAX_TEXT_LENGTH = 300;
export const MAX_MILEAGE = 999999;

export const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', value: FuelEnum.PETROL },
  { icon: 'droplet', value: FuelEnum.DIESEL },
  { icon: 'bolt-lightning', value: FuelEnum.ELECTRIC },
];

export const altFuelTypes: FuelType[] = [
  { icon: 'fire', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', value: FuelEnum.ELECTRIC },
];

export const allFuelTypes: FuelType[] = [
  { icon: 'gas-pump', value: FuelEnum.PETROL },
  { icon: 'droplet', value: FuelEnum.DIESEL },
  { icon: 'fire', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', value: FuelEnum.ELECTRIC }
];

export const statusTypes: StatusType[] = [
  { icon: 'question', value: ServiceStatusEnum.PLANNED },
  { icon: 'calendar-days', value: ServiceStatusEnum.SCHEDULDED },
  { icon: 'check', value: ServiceStatusEnum.COMPLETED }
];

export const availableUnits = {
  priceUnits: [
    { label: PriceUnitEnum.EUR, value: PriceUnitEnum.EUR },
    { label: PriceUnitEnum.PLN, value: PriceUnitEnum.PLN },
    { label: PriceUnitEnum.USD, value: PriceUnitEnum.USD }
  ],
  distanceUnits: [
    DistanceUnitEnum.KM,
    DistanceUnitEnum.MI
  ],
  capacityUnits: [
    CapacityUnitEnum.L,
    CapacityUnitEnum.GAL
  ]
};

export const navigationRoutes: NavigationOptionType[] = [
  { href: "/", icon: "chart-simple", name: 'dashboardNav'},
  { href: "/refuels-list", icon: "gas-pump", name: 'refuelsNav' },
  { href: "/services-list", icon: "wrench", name: 'servicesNav' },
  { href: "/menu", icon: "list", name: 'menuNav' }
];

export const menuRoutes: MenuOptionType[] = [
  { href: "/menu/cars-list", icon: "car", name: 'myCarsItem' },
  { href: "/menu/preferences", icon: "gears", name: 'preferencesItem' }
];

export const availableLanguages = [
  { name: LangEnum.ENGLISH, code: 'en' },
  { name: LangEnum.POLISH, code: 'pl' },
  { name: LangEnum.GERMAN, code: 'de' }
];
