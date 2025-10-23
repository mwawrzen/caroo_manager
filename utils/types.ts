// enums

export enum FuelEnum {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  GAS = 'gas',
  ELECTRIC = 'electric'
}

export enum ServiceStatusEnum {
  PLANNED = 'planned',
  SCHEDULDED = 'schedulded',
  COMPLETED = 'completed'
}

export enum LangEnum {
  ENGLISH = 'english',
  POLISH = 'polish',
  GERMAN = 'german'
}

export enum DistanceUnitEnum {
  KM = 'km',
  MI = 'mi'
}

// object interfaces

export interface Refuel {
  id: string;
  date: Date;
  unitPrice: number;
  amountOfFuel: number;
  fuel: FuelEnum;
  mileage: number;
  note: string;
}

export interface Service {
  id: string;
  date?: Date | null;
  status: ServiceStatusEnum;
  description: string; //! TEMP
  mileage?: number;
  price?: number;
  note: string;
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

// components types

export type InfoRowType = {
  value: string | null;
  label: string;
  column?: boolean;
};

// action types

export type AddCarType = {
  name: string,
  mileage: number,
  fuel: FuelEnum,
  altFuel?: FuelEnum
}

export type EditCarType = AddCarType;

export type AddRefuelType = {
  unitPrice: number;
  amountOfFuel: number;
  fuel: FuelEnum;
  mileage: number;
  note: string;
}
