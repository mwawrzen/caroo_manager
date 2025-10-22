import { Car, FuelEnum } from "@/utils/types";

export type ContextDataType = {
  cars: Car[]
  currentCarId: Car['id'];
};

export enum ActionTypeEnum {
  ADD = 'add',
  EDIT = 'edit',
  REMOVE = 'remove'
}

type AddCarActionType = {
  type: typeof ActionTypeEnum.ADD,
  name: string;
  mileage: number;
  fuel: FuelEnum;
  altFuel?: FuelEnum;
};

type EditCarActionType = {
  type: typeof ActionTypeEnum.EDIT,
  id: string,
  car: Car
};

type RemoveCarActionType = {
  type: typeof ActionTypeEnum.ADD,
  id: string
};

type UnknownAction = any;

export type ActionType =
  AddCarActionType |
  EditCarActionType |
  RemoveCarActionType |
  UnknownAction;
