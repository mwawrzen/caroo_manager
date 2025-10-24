import { Refuel } from "./types";

export function getSumPriceString(refuel: Refuel): string {
  return (refuel.unitPrice * refuel.amountOfFuel).toFixed(2);
};
