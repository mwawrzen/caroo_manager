import { AddCarType, EditCarType, FuelEnum, Refuel, Service } from '@/utils/types';
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
  setCurrentCar: (id: Car['id']) => void;
  editCar: ( id: Car['id'], newCar: EditCarType ) => void;
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
    }
  ],
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
  setCurrentCar: id => set(state => ({ currentCar: state.cars.find(car => car.id === id) })),
  //TODO: optimize
  editCar: (id, newCar) => set(state => {
    const car = state.cars.find(car => car.id === id);
    const carIndex = state.cars.findIndex(car => car.id === id);
    const newCarsState = [...state.cars];
    if (!car)
      return state;
    const newCarObject: Car = { ...car };
    newCarObject.name = newCar.name;
    newCarObject.mileage = newCar.mileage;
    newCarObject.fuel = newCar.fuel;
    newCarObject.altFuel = newCar.altFuel || undefined;
    newCarsState.splice(carIndex, 1, newCarObject);
    return { cars: newCarsState };
  }),
  // removeCar: id => set(state => ({ cars: [ ...state.cars, newCar ]}))
}));

export default useCarStore;
