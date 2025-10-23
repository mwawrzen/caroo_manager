import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import { InfoRowType } from "@/utils/types";
import { useEffect } from "react";

function RefuelItem({ refuel }: { refuel: any }) {

  const { date, unitPrice, amountOfFuel, fuel, mileage, note } = refuel;

  const refuelRowsData: InfoRowType[] = [
    { label: 'Fuel:', value: fuel },
    { label: 'Amount of fuel:', value: `${amountOfFuel} L` },
    { label: 'Unit price:', value: `${unitPrice} USD` },
    { label: 'Sum price', value: `${(unitPrice * amountOfFuel).toFixed(2)} USD` },
    { label: 'Mileage', value: `${mileage} Km` },
    { label: 'Note:', value: note },
  ];

  //TODO: make date format nice
  return <InfoList title={date.toLocaleString().split(',')[0]} rowsData={refuelRowsData} />
}

export default function RefuelsList() {

  const { currentCar } = useCarStore();

  if (!currentCar)
    return null;

  const refuelItems = currentCar.refuels.map(refuel => (
    <RefuelItem key={refuel.id} refuel={refuel} />
  ));

  useEffect(() => {}, [currentCar.refuels])

  return (
    <ListView title="Refuels" addHref="./add-refuel" items={refuelItems} />
  );
};
