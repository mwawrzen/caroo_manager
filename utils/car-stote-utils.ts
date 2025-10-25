import { AddRefuelType, Refuel } from "./types";

export function getSumPrice(refuel: AddRefuelType): number {
  return Number((refuel.unitPrice * refuel.amountOfFuel).toFixed(2));
};

export function sortRefuelsByDate(refuels: Refuel[]): Refuel[] {
  return refuels.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getUnitAvgConsumption(lastRefuel: Refuel, currentRefuel: AddRefuelType): number | null {
  if (!lastRefuel || !lastRefuel.fullyRefueled)
    return null;
  return (100 * currentRefuel.amountOfFuel) / (currentRefuel.mileage - lastRefuel.mileage);
}

export function getAvgConsumption(refuels: Refuel[]): number {
  let length = 0;
  const sumOfAvgs = refuels.reduce((acc, curr) => {
    if(curr.avgConsumption) {
      length++;
      acc += curr.avgConsumption;
    }
    return acc;
  }, 0);
  return sumOfAvgs / length;
}
