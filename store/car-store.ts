import { filterRefuelsByType, getAvgConsumption, getAvgConsumptionPrice, getOneRefuelTotalPrice, getRefuelsTotalPrice, getUnitAvgConsumption, sortRefuelsByDate } from '@/utils/car-store-utils';
import { cars } from '@/utils/sample-data';
import {
  AddCarType,
  AddRefuelType,
  AddServiceType,
  Car,
  EditCarType,
  FuelEnum,
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
  getRefuelsTotalPrice: (fuel: FuelEnum) => number;
  getAvgConsumption: () => number;
  getAvgConsumptionPrice: () => number;
  addService: ( id: Car['id'], newService: AddServiceType ) => void;
  getSortedServices: () => Service[];
  getServicesTotalPrice: () => number;
  // removeCar: ( id: Car['id'] ) => void;
}

const useCarStore = create<CarStore>()((set, get) => ({
  cars,
  currentCar: null, // cars[0]
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
    const filteredRefuels = filterRefuelsByType(car.refuels, newRefuel.fuel);
    const lastRefuel = sortRefuelsByDate(filteredRefuels)[0];
    const newRefuelObject: Refuel = {
      id: uuid.v4(),
      date: new Date(Date.now()),
      sumPrice: getOneRefuelTotalPrice(newRefuel),
      avgConsumption: getUnitAvgConsumption(lastRefuel, newRefuel),
      ...newRefuel,
    };
    car.refuels.push(newRefuelObject);
    car.mileage = newRefuel.mileage;
    const newState = {
      cars: newCarsState
    };
    return newState;
  }),
  getSortedRefuels: () => {
    const currentCar = get().currentCar;
    if (!currentCar)
      return [];
    return sortRefuelsByDate( currentCar.refuels );
  },
  getRefuelsTotalPrice: fuel => {
    const currentCar = get().currentCar;
    if (!currentCar)
      return 0;
    const filteredRefuels = filterRefuelsByType(currentCar.refuels, fuel);
    return getRefuelsTotalPrice(filteredRefuels);
  },
  getAvgConsumption: () => {
    const currentCar = get().currentCar;
    if (!currentCar)
      return 0;
    const { refuels, fuel, altFuel } = currentCar;
    const filteredRefuels = filterRefuelsByType( refuels, altFuel || fuel);
    return getAvgConsumption(filteredRefuels);
  },
  getAvgConsumptionPrice: () => {
    const currentCar = get().currentCar;
    if (!currentCar)
      return 0;
    const { refuels, fuel, altFuel } = currentCar;
    const filteredRefuels = filterRefuelsByType( refuels, altFuel || fuel);
    return getAvgConsumptionPrice(filteredRefuels);
  },
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
  getServicesTotalPrice: () => get().currentCar?.services
    .reduce((acc, curr: Service) => acc + (curr.price || 0), 0) || 0
}));

export default useCarStore;
