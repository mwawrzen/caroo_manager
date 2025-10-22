import { FuelEnum, Refuel, Service } from '@/utils/types';
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
  addCar: ( newCar: Car ) => void;
  // editCar: ( id: Car['id'], newCar: Car ) => void;
  // removeCar: ( id: Car['id'] ) => void;
}

const useCarStore = create<CarStore>(set => ({
  cars: [],
  currentCar: null,
  addCar: newCar => set(state => ({ cars: [ ...state.cars, newCar ]})),
  // editCar: (id, newCar) => set(state => ({ cars: [ ...state.cars, newCar ]})),
  // removeCar: id => set(state => ({ cars: [ ...state.cars, newCar ]}))
}));

export default useCarStore;
