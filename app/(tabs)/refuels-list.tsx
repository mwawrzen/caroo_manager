import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import { formatDate } from "@/utils/format-date";
import { getSumPriceString } from "@/utils/get-sum-price";
import { InfoRowType } from "@/utils/types";
import { useEffect } from "react";

function RefuelItem({ refuel }: { refuel: any }) {

  const { date, unitPrice, amountOfFuel, fuel, mileage, fullyRefueled, note } = refuel;

  const refuelRowsData: InfoRowType[] = [
    { label: 'Fuel:', value: fuel },
    { label: 'Fully refueled:', value: fullyRefueled ? "Yes" : "No" },
    { label: 'Amount of fuel:', value: `${amountOfFuel} L` },
    { label: 'Unit price:', value: `${unitPrice} USD` },
    { label: 'Sum price', value: `${getSumPriceString(refuel)} USD` },
    { label: 'Mileage', value: `${mileage} Km` },
    { label: 'Note:', value: note },
  ];

  //TODO: make date format nice
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
