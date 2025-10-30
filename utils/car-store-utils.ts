import { AddRefuelType, FuelEnum, Refuel, Service, ServiceStatusEnum } from "./types";

export function getOneRefuelTotalPrice(refuel: AddRefuelType): number {
  return refuel.unitPrice * refuel.amountOfFuel;
};

export function getRefuelsTotalPrice(refuels: Refuel[]): number {
  const total = refuels.reduce((acc, curr) => acc + getOneRefuelTotalPrice(curr), 0);
  return total;
};

export function sortRefuelsByDate(refuels: Refuel[]): Refuel[] {
    return refuels.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export function sortRefuelsByMileage(refuels: Refuel[]): Refuel[] {
    return refuels.sort((a, b) => b.mileage - a.mileage);
};

export function filterRefuelsByType(refuels: Refuel[], type: FuelEnum): Refuel[] {
  return refuels.filter(refuel => refuel.fuel === type);
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

  const sortedRefuels = sortRefuelsByMileage(refuels);
  const totalMileage = sortedRefuels[0].mileage - sortedRefuels[refuels.length - 1].mileage;

  if (totalMileage === 0)
    return 0;

  const totalPrice = getRefuelsTotalPrice(sortedRefuels);

  return (1 * totalPrice) / totalMileage;
};

export function setRefuelsUnitAvgConsumption(
  refuels: Refuel[],
  fuel: FuelEnum
) {

  const filtered = filterRefuelsByType(refuels, fuel);

  if (filtered.length === 1)
    filtered[0].avgConsumption = null;

  for (let i = 0; i < filtered.length - 1; i++) {
    filtered[i].avgConsumption = getUnitAvgConsumption(filtered[i + 1], filtered[i]);
  }
};

export function checkIsMileageInScopeByDate(
  refuels: Refuel[],
  date: Date,
  mileage: number,
  fuel: FuelEnum
): boolean {

  const refuelsObj = filterRefuelsByType([...refuels], fuel);

  let lastRefuel: Refuel | null = null;
  let nextRefuel: Refuel | null = null;

  refuelsObj.forEach((refuel: Refuel) => {
    if (refuel.date > date && (nextRefuel ? refuel.date < nextRefuel.date : true))
      nextRefuel = refuel as Refuel;
    if (refuel.date < date && (lastRefuel ? refuel.date > lastRefuel.date : true))
      lastRefuel = refuel as Refuel;
  });

  if (
    (lastRefuel && (lastRefuel as Refuel).mileage >= mileage) ||
    (nextRefuel && (nextRefuel as Refuel).mileage <= mileage)
  ) {
    console.log(lastRefuel ? (lastRefuel as Refuel).mileage : '');
    console.log(mileage);
    console.log(nextRefuel ? (nextRefuel as Refuel).mileage : '');
    return false;
  }

  // console.clear();
  // console.log(
  //   '\n\n\n',
  //   nextRefuel ? (nextRefuel as Refuel).date.toLocaleString() : '', '\n',
  //   date.toLocaleString(), '\n',
  //   lastRefuel ? (lastRefuel as Refuel).date.toLocaleString() : ''
  // );

  return true;
};

export function sortServicesByDate(services: Service[]): Service[] {

  const sortedPlanned = services
    .filter(service => service.status === ServiceStatusEnum.PLANNED)
    .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());

  const notPlanned = services.filter(service => service.status
    !== ServiceStatusEnum.PLANNED);

  const sortedNotPlanned = notPlanned.sort((a: Service, b: Service) => {
    if (b.date && a.date)
      return b.date.getTime() - a.date.getTime();
    return 0;
  });

  return [ ...sortedNotPlanned, ...sortedPlanned ];
};
