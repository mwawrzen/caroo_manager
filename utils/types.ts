// enums

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export enum FuelEnum {
  PETROL = 'petrol',
  DIESEL = 'diesel',
  GAS = 'gas',
  ELECTRIC = 'electric'
};

export enum ServiceStatusEnum {
  PLANNED = 'planned',
  SCHEDULDED = 'schedulded',
  COMPLETED = 'completed'
};

export enum LangEnum {
  ENGLISH = 'english',
  POLISH = 'polish',
  GERMAN = 'german'
};

export enum PriceUnitEnum {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  PLN = 'PLN'
};

export enum DistanceUnitEnum {
  KM = 'km',
  MI = 'mi'
};

export enum CapacityUnitEnum {
  L = 'L',
  GAL = 'GAL'
};

export type UnitEnumType =
  PriceUnitEnum |
  DistanceUnitEnum |
  CapacityUnitEnum;

// object interfaces

export interface Refuel {
  id: string;
  date: Date;
  unitPrice: number;
  amountOfFuel: number;
  fuel: FuelEnum;
  mileage: number;
  fullyRefueled: boolean;
  note: string;
};

export interface Service {
  id: string;
  createdDate: Date;
  status: ServiceStatusEnum;
  description: string;
  date?: Date;
  mileage?: number;
  price?: number;
  note: string;
};

export interface Car {
  id: string;
  name: string;
  mileage: number;
  fuel: FuelEnum;
  altFuel?: FuelEnum;
  refuels: Refuel[];
  services: Service[];
};

// components types

export type InfoRowType = {
  value: string | null;
  label: string;
  column?: boolean;
};

// data types

export type FuelType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: FuelEnum;
};

// action types

export type AddCarType = {
  name: string,
  mileage: number,
  fuel: FuelEnum,
  altFuel?: FuelEnum
};

export type EditCarType = AddCarType;

export type AddRefuelType = {
  unitPrice: number;
  amountOfFuel: number;
  fuel: FuelEnum;
  mileage: number;
  fullyRefueled: boolean;
  note: string;
};

export type AddServiceType = {
  status: ServiceStatusEnum.PLANNED | ServiceStatusEnum.SCHEDULDED;
  description: string; //! TEMP
  mileage?: number;
  price?: number;
  note: string;
};
