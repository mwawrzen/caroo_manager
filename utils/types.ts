export enum FuelEnum {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  GAS = 'gas',
  ELECTRIC = 'electric'
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

export type AddCarType = {
  name: string,
  mileage: number,
  fuel: FuelEnum,
  altFuel?: FuelEnum
}

export type EditCarType = AddCarType;

export type InfoRowType = {
  value: string | null;
  label: string;
};
