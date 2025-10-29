import { filterRefuelsByType, getAvgConsumption, getAvgConsumptionPrice, getOneRefuelTotalPrice, getRefuelsTotalPrice, getUnitAvgConsumption, sortRefuelsByDate, sortServicesByDate } from '@/utils/car-store-utils';
import { cars } from '@/utils/sample-data';
import {
  AddCarType,
  AddRefuelType,
  AddServiceType,
  Car,
  EditCarType,
  EditRefuelType,
  EditServiceType,
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
  editRefuel: ( carId: Car['id'], refuelId: Refuel['id'], newRefuel: EditRefuelType ) => void;
  getRefuelById: ( id: Refuel['id'] ) => Refuel | null;
  getSortedRefuels: () => Refuel[];
  getRefuelsTotalPrice: (fuel: FuelEnum) => number;
  getAvgConsumption: () => number;
  getAvgConsumptionPrice: () => number;

  addService: ( id: Car['id'], newService: AddServiceType ) => void;
  editService: ( carId: Car['id'], serviceId: Service['id'], newService: EditServiceType ) => void;
  getServiceById: ( id: Service['id'] ) => Service | null;
  getSortedServices: () => Service[];
  getServicesTotalPrice: () => number;
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
  editCar: (id, newCar) => set(state => {
    const newCarsState = [...state.cars];
    const car = state.cars.find(car => car.id === id);
    if (!car)
      return state;
    car.name = newCar.name;
    car.mileage = newCar.mileage;
    car.fuel = newCar.fuel;
    car.altFuel = newCar.altFuel || undefined;
    return { cars: newCarsState };
  }),
  setCurrentCar: id => set(state => ({
    currentCar: state.cars.find(car => car.id === id) || state.currentCar
  })),
  getCarById: id => get().cars.find(car => car.id === id) || null,
  // removeCar: id => set(state => ({ cars: [ ...state.cars, newCar ]}))
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
  editRefuel: ( carId, refuelId, newRefuel ) => set(state => { //TODO recalculate avg consumption
    const newCarsState = [...state.cars];
    const car = newCarsState.find(car => car.id === carId);
    if (!car)
      return state;
    const refuel = car.refuels.find(refuel => refuel.id === refuelId);
    if (!refuel)
      return state;
    refuel.unitPrice = newRefuel.unitPrice;
    refuel.amountOfFuel = newRefuel.amountOfFuel;
    refuel.fuel = newRefuel.fuel;
    refuel.mileage = newRefuel.mileage;
    refuel.fullyRefueled = newRefuel.fullyRefueled;
    refuel.note = newRefuel.note;
    return { cars: newCarsState };
  }),
  getRefuelById: id => {
    const refuels: Refuel[] = get().cars.map(car => car.refuels).flat();
    return refuels.find(refuel => refuel.id === id) || null;
  },
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
    if (newServiceObject.mileage && newServiceObject.mileage >= car.mileage)
      car.mileage = newServiceObject.mileage;
    const newState = {
      cars: newCarsState
    };
    return newState;
  }),
  editService: ( carId, serviceId, newService ) => set(state => {
    const newCarsState = [...state.cars];
    const car = newCarsState.find(car => car.id === carId);
    if (!car)
      return state;
    const service = car.services.find(service => service.id === serviceId);
    if (!service)
      return state;
    service.status = newService.status;
    service.price = newService.price || undefined;
    service.mileage = newService.mileage || undefined;
    service.date = newService.date || undefined;
    service.description = newService.description;
    service.note = newService.note;
    return { cars: newCarsState };
  }),
  getServiceById: id => {
    const services: Service[] = get().cars.map(car => car.services).flat();
    return services.find(service => service.id === id) || null;
  },
  getSortedServices: () => {
    const currentCar = get().currentCar;
    if (!currentCar)
      return [];
    return sortServicesByDate(currentCar.services);
  },
  getServicesTotalPrice: () => get().currentCar?.services
    .reduce((acc, curr: Service) => acc + (curr.price || 0), 0) || 0
}));

export default useCarStore;
