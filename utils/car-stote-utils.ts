import { AddRefuelType, Refuel } from "./types";

export function getSumPrice(refuel: AddRefuelType): number {
  return Number((refuel.unitPrice * refuel.amountOfFuel).toFixed(2));
};

export function sortRefuelsByDate(refuels: Refuel[]): Refuel[] {
  return refuels.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getAvgConsumption(lastRefuel: Refuel, currentRefuel: AddRefuelType): number | null {
  if (!lastRefuel || !lastRefuel.fullyRefueled)
    return null;
  return (100 * currentRefuel.amountOfFuel) / (currentRefuel.mileage - lastRefuel.mileage);
}
