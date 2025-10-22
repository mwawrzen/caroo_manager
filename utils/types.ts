export enum FuelEnum {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  GAS = 'gas'
}

export enum ServiceStatusEnum {
  OPEN = 'open',
  CLOSED = 'closed'
}

export interface Refuel {
  id: string;
  date: Date;
  name: string;
}

export interface Service {
  id: string;
  date: Date;
  status: ServiceStatusEnum;
  name: string;
}

export interface Car {
  id: string;
  name: string;
  mileage: number;
  fuel: FuelEnum;
  altFuel?: FuelEnum;
  refuels: Refuel[];
  services: Service[];
}
