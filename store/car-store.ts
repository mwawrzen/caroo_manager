import { AddCarType, FuelEnum, Refuel, Service } from '@/utils/types';
import uuid from "react-native-uuid";
import { create } from 'zustand';

interface Car {
  id: string;
  name: string;
  mileage: number;
  fuel: FuelEnum;
  altFuel?: FuelEnum;
  refuels: Refuel[];
  services: Service[];
}

interface CarStore {
  cars: Car[];
  currentCar: Car | null;
  addCar: (newCar: AddCarType) => void;
  // editCar: ( id: Car['id'], newCar: Car ) => void;
  // removeCar: ( id: Car['id'] ) => void;
}

const useCarStore = create<CarStore>()(set => ({
  cars: [
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
      refuels: [],
      services: [],
    },
    {
      id: "aw5h345h4hddfwawnd",
      name: "Honda CR-V",
      mileage: 246000,
      fuel: FuelEnum.PETROL,
      altFuel: FuelEnum.GAS,
      refuels: [],
      services: [],
    },
    {
      id: "awdoaiwn123doawnd",
      name: "Subaru Forester",
      mileage: 257400,
      fuel: FuelEnum.PETROL,
      altFuel: FuelEnum.GAS,
      refuels: [],
      services: [],
    },
    {
      id: "awdoaaw123dawdrgrthgnd",
      name: "Opel Astra H",
      mileage: 292456,
      fuel: FuelEnum.PETROL,
      refuels: [],
      services: [],
    },
    {
      id: "aw5h345h1234hddfwawnd",
      name: "Honda CR-V",
      mileage: 246000,
      fuel: FuelEnum.PETROL,
      refuels: [],
      services: [],
    }
  ],
  // currentCar: null,
  currentCar: {
    id: "awdoaiwndoawnd",
    name: "Subaru Forester",
    mileage: 257400,
    fuel: FuelEnum.PETROL,
    altFuel: FuelEnum.GAS,
    refuels: [],
    services: [],
  },
  addCar: newCar => set(state => {
    const newCarObject: Car = {
      ...newCar,
      id: uuid.v4(),
      refuels: [],
      services: []
    };
    const newState = {
      cars: [ ...state.cars, newCarObject ],
      currentCar: state.currentCar || newCarObject
    };
    return newState;
  }),
  // editCar: (id, newCar) => set(state => ({ cars: [ ...state.cars, newCar ]})),
  // removeCar: id => set(state => ({ cars: [ ...state.cars, newCar ]}))
}));

export default useCarStore;
