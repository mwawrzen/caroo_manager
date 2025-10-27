import { AddRefuelType, FuelEnum, Refuel, Service, ServiceStatusEnum } from "./types";

export function getOneRefuelTotalPrice(refuel: AddRefuelType): number {
  return refuel.unitPrice * refuel.amountOfFuel;
};

export function getRefuelsTotalPrice(refuels: Refuel[]): number {
  const total = refuels.reduce((acc, curr) => acc + getOneRefuelTotalPrice(curr), 0);
  return total || 0;
};

export function sortRefuelsByDate(refuels: Refuel[]): Refuel[] {
  return refuels.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export function filterRefuelsByType(refuels: Refuel[], type: FuelEnum): Refuel[] {
  return refuels.filter(refuel => refuel.fuel === type)
};

export function filterRefuelsByAvgConsumption(refuels: Refuel[]): Refuel[] {
  return refuels.filter(refuel => refuel.avgConsumption );
};

export function getUnitAvgConsumption(
  lastRefuel: Refuel,
  currentRefuel: AddRefuelType
): number | null {

  if (!lastRefuel || !lastRefuel.fullyRefueled)
    return null;

  const mileageDifference = currentRefuel.mileage - lastRefuel.mileage;
  return (100 * currentRefuel.amountOfFuel) / mileageDifference;
};

export function getAvgConsumption(refuels: Refuel[]): number {

  let length = 0;

  const sumOfAvgs = refuels.reduce((acc, curr) => {
    if(curr.avgConsumption) {
      length++;
      acc += curr.avgConsumption;
    }
    return acc;
  }, 0);

  return (sumOfAvgs / length) || 0;
};

export function getAvgConsumptionPrice(refuels: Refuel[]): number {

  if (!refuels.length)
    return 0;

  const sortedRefuels = sortRefuelsByDate(refuels);
  const totalMileage = sortedRefuels[0].mileage - sortedRefuels[refuels.length - 1].mileage;
  const totalPrice = getRefuelsTotalPrice(sortedRefuels);

  return (1 * totalPrice) / totalMileage;
};

export function sortServicesByDate(services: Service[]): Service[] {
  const planned = services.filter(service => service.status === ServiceStatusEnum.PLANNED);
  const notPlanned = services.filter(service => service.status !== ServiceStatusEnum.PLANNED);
  const sorted = notPlanned.sort((a: Service, b: Service) => {
    if (b.date && a.date)
      return b.date.getTime() - a.date.getTime();
    return 0;
  });
  return [ ...sorted, ...planned ];
};
