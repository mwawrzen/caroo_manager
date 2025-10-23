import {
  AddCarType,
  AddRefuelType,
  AddServiceType,
  Car,
  EditCarType,
  Refuel,
  Service
} from '@/utils/types';
import uuid from "react-native-uuid";
import { create } from 'zustand';

interface CarStore {
  cars: Car[];
  currentCarId: Car['id'] | null;
  addCar: (newCar: AddCarType) => void;
  editCar: ( id: Car['id'], newCar: EditCarType ) => void;
  setCurrentCar: (id: Car['id']) => void;
  getCurrentCar: () => Car | null;
  addRefuel: ( id: Car['id'], newRefuel: AddRefuelType ) => void;
  addService: ( id: Car['id'], newService: AddServiceType ) => void;
  // removeCar: ( id: Car['id'] ) => void;
}

const useCarStore = create<CarStore>()((set, get) => ({
  cars: [],
  currentCarId: null,
  addCar: newCar => set(state => {
    const newCarObject: Car = {
      ...newCar,
      id: uuid.v4(),
      refuels: [],
      services: []
    };
    const newState = {
      cars: [ ...state.cars, newCarObject ],
      currentCarId: state.currentCarId || newCarObject.id
    };
    return newState;
  }),
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
  setCurrentCar: id => set(state => ({ currentCarId: state.cars.find(car => car.id === id)?.id || null })),
  getCurrentCar: () => get().cars.find(car => car.id === get().currentCarId) || null,
  // removeCar: id => set(state => ({ cars: [ ...state.cars, newCar ]}))
  //TODO: optimize
  addRefuel: (id, newRefuel) => set(state => {
    const newCarsState = [ ...state.cars];
    const car = newCarsState.find(car => car.id === id);
    if (!car)
      return state;
    const newRefuelObject: Refuel = {
      id: uuid.v4(),
      date: new Date(Date.now()),
      ...newRefuel,
    };
    car.refuels.push(newRefuelObject);
    const newState = {
      cars: newCarsState
    };
    return newState;
  }),
  //TODO: optimize
  addService: (id, newService) => set(state => {
    const newCarsState = [ ...state.cars];
    const car = newCarsState.find(car => car.id === id);
    if (!car)
      return state;
    const newServiceObject: Service = {
      id: uuid.v4(),
      date: new Date(Date.now()),
      ...newService,
    };
    car.services.push(newServiceObject);
    const newState = {
      cars: newCarsState
    };
    return newState;
  }),
}));

export default useCarStore;
