import uuid from "react-native-uuid";
import { FuelEnum, ServiceStatusEnum } from "./types";

export const cars = [
  {
    id: uuid.v4(),
    name: "Subaru Forester",
    mileage: 257400,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [],
    services: [],
  },
  {
    id: uuid.v4(),
    name: "Opel Astra H",
    mileage: 292456,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [
      {
        id: uuid.v4(),
        date: new Date(2025, 9, 1),
        unitPrice: 5.54,
        amountOfFuel: 30.54,
        fuel: FuelEnum.PETROL,
        mileage: 10,
        note: 'refuel gas 30,54L',
      },
      {
        id: uuid.v4(),
        date: new Date(2025, 9, 14),
        unitPrice: 5.80,
        amountOfFuel: 20.17,
        fuel: FuelEnum.PETROL,
        mileage: 20,
        note: 'refuel gas 20,17L',
      },
      {
        id: uuid.v4(),
        date: new Date(2025, 9, 3),
        unitPrice: 5.80,
        amountOfFuel: 25.34,
        fuel: FuelEnum.PETROL,
        mileage: 34,
        note: 'refuel gas 25,34L',
      },
      {
        id: uuid.v4(),
        date: new Date(2025, 9, 9),
        unitPrice: 5.72,
        amountOfFuel: 37.29,
        fuel: FuelEnum.PETROL,
        mileage: 67,
        note: '',
      }
    ],
    services: [],
  },
  {
    id: uuid.v4(),
    name: "Honda CR-V",
    mileage: 246000,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [],
    services: [
      {
        id: uuid.v4(),
        createdDate: new Date(2025, 9, 2),
        status: ServiceStatusEnum.PLANNED,
        description: 'Replacement of pads',
        mileage: 1412,
        price: 800.49,
        note: ''
      },
      {
        id: uuid.v4(),
        createdDate: new Date(2025, 9, 14),
        status: ServiceStatusEnum.SCHEDULDED,
        description: 'Timing belt replacement',
        mileage: 12552,
        price: 1250,
        note: ''
      },
      {
        id: uuid.v4(),
        createdDate: new Date(2025, 9, 7),
        status: ServiceStatusEnum.COMPLETED,
        description: 'Bodywork repair of the right front fender.',
        mileage: 10122,
        price: 360.99,
        note: 'Very fast, good mechanik, ul. Fatimska 10.'
      },
    ],
  }
];
