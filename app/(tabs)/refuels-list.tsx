import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { formatDate } from "@/utils/format-date";
import { InfoRowType } from "@/utils/types";
import { useEffect } from "react";

function RefuelItem({ refuel }: { refuel: any }) {

  const { date, unitPrice, amountOfFuel, sumPrice, fuel, mileage, avgConsumption, fullyRefueled, note } = refuel;
  const { capacityUnit, priceUnit, distanceUnit } = usePreferencesStore();

  const refuelRowsData: InfoRowType[] = [
    { label: 'Fuel:', value: fuel },
    { label: 'Fully refueled:', value: fullyRefueled ? "Yes" : "No" },
    { label: 'Amount of fuel:', value: `${amountOfFuel} ${capacityUnit}` },
    { label: 'Unit price:', value: `${unitPrice} ${priceUnit}` },
    { label: 'Sum price', value: `${sumPrice} ${priceUnit}` },
    { label: 'Average consumption', value: `${avgConsumption || '--'} ${capacityUnit}/100km`},
    { label: 'Mileage', value: `${mileage} ${distanceUnit}` },
    { label: 'Note:', value: note },
  ];

  return <InfoList title={formatDate(date)} rowsData={refuelRowsData} />
}

export default function RefuelsList() {

  const { currentCar, getSortedRefuels } = useCarStore();

  if (!currentCar)
    return null;

  const refuelItems = getSortedRefuels().map(refuel => (
    <RefuelItem key={refuel.id} refuel={refuel} />
  ));

  useEffect(() => {}, [currentCar.refuels])

  return (
    <ListView title="Refuels" addHref="./add-refuel" items={refuelItems} />
  );
};
