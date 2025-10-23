import { FuelEnum, ServiceStatusEnum } from "./types";

export const cars = [
  {
    id: "awdoaiwndoawnd",
    name: "Subaru Forester",
    mileage: 257400,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [],
    services: [],
  },
  {
    id: "awdoaawdawdrgrthgnd",
    name: "Opel Astra H",
    mileage: 292456,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [
      {
        id: "ofsnef89h3f34f",
        date: new Date(2025, 11, 1),
        unitPrice: 5.54,
        amountOfFuel: 30.54,
        fuel: FuelEnum.PETROL,
        mileage: 10,
        note: 'refuel gas 30,54L',
      },
      {
        id: "ofsnef89h3adwf34f",
        date: new Date(2025, 11, 11),
        unitPrice: 5.80,
        amountOfFuel: 20.17,
        fuel: FuelEnum.PETROL,
        mileage: 20,
        note: 'refuel gas 20,17L',
      },
      {
        id: "ofsneawdaf89h3f34f",
        date: new Date(2025, 11, 14),
        unitPrice: 5.80,
        amountOfFuel: 25.34,
        fuel: FuelEnum.PETROL,
        mileage: 34,
        note: 'refuel gas 25,34L',
      },
      {
        id: "ofsneawda352f89h3f34f",
        date: new Date(2025, 11, 18),
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
    id: "aw5h345h4hddfwawnd",
    name: "Honda CR-V",
    mileage: 246000,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [],
    services: [
      {
        id: "i020000000",
        // date: new Date(2025, 10, 2),
        date: null,
        status: ServiceStatusEnum.PLANNED,
        description: 'Replacement of pads',
        mileage: 1412,
        price: 800.49,
        note: ''
      },
      {
        id: "i0200adawdawd00000",
        date: new Date(2025, 10, 14),
        status: ServiceStatusEnum.SCHEDULDED,
        description: 'Timing belt replacement',
        mileage: 12552,
        price: 1250,
        note: ''
      },
      {
        id: "i020awdawdawd000000",
        date: new Date(2025, 10, 2),
        status: ServiceStatusEnum.COMPLETED,
        description: 'Bodywork repair of the right front fender.',
        mileage: 10122,
        price: 360.99,
        note: 'Very fast, good mechanik, ul. Fatimska 10.'
      },
    ],
  }
];
