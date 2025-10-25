import { AddRefuelType, Refuel } from "./types";

export function getSumPrice(refuel: AddRefuelType): number {
  return Number((refuel.unitPrice * refuel.amountOfFuel).toFixed(2));
};

