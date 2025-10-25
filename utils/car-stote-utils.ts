import { AddRefuelType, Refuel } from "./types";

export function getSumPrice(refuel: AddRefuelType): number {
  return Number((refuel.unitPrice * refuel.amountOfFuel).toFixed(2));
};

export function sortRefuelsByDate(refuels: Refuel[]): Refuel[] {
  return refuels.sort((a, b) => b.date.getTime() - a.date.getTime());
}

