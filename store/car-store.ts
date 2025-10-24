import { cars } from '@/utils/sample-data';
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
  currentCar: Car | null;
  addCar: (newCar: AddCarType) => void;
  editCar: ( id: Car['id'], newCar: EditCarType ) => void;
  setCurrentCar: (id: Car['id']) => void;
  getCarById: ( id: Car['id'] ) => Car | null;
  addRefuel: ( id: Car['id'], newRefuel: AddRefuelType ) => void;
  getSortedRefuels: () => Refuel[];
  getSortedServices: () => Service[];
  addService: ( id: Car['id'], newService: AddServiceType ) => void;
  // removeCar: ( id: Car['id'] ) => void;
}

const useCarStore = create<CarStore>()((set, get) => ({
  cars,
  currentCar: cars[0],
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
    return {
      cars: newCarsState,
      currentCar: state.currentCar?.id === car.id ? newCarObject : state.currentCar
    };
  }),
  setCurrentCar: id => set(state => ({
    currentCar: state.cars.find(car => car.id === id) || state.currentCar
  })),
  getCarById: id => get().cars.find(car => car.id === id) || null,
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
  getSortedRefuels: () => get().currentCar?.refuels
    .sort((a: Refuel, b: Refuel) => b.date.getTime() - a.date.getTime()) || [],
  //TODO: optimize
  addService: (id, newService) => set(state => {
    const newCarsState = [ ...state.cars];
    const car = newCarsState.find(car => car.id === id);
    if (!car)
      return state;
    const newServiceObject: Service = {
      id: uuid.v4(),
      createdDate: new Date(Date.now()),
      ...newService,
    };
    car.services.push(newServiceObject);
    const newState = {
      cars: newCarsState
    };
    return newState;
  }),
  getSortedServices: () => get().currentCar?.services
    .sort((a: Service, b: Service) => b.createdDate.getTime() - a.createdDate.getTime()) || [],
}));

export default useCarStore;
