import { AddCarType, EditCarType, FuelEnum, Refuel, Service, ServiceStatusEnum } from '@/utils/types';
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
  ],
  currentCar: {
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
