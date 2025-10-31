import ListItem from "@/components/ui/list/list-item";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { formatDate } from "@/utils/format-date";
import { ListItemRowType } from "@/utils/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function RefuelItem({ refuel }: { refuel: any }) {

  const { t } = useTranslation();

  const { date, unitPrice, amountOfFuel, sumPrice, fuel, mileage, avgConsumption, fullyRefueled, note } = refuel;
  const { capacityUnit, priceUnit, distanceUnit } = usePreferencesStore();

  const refuelRowsData: ListItemRowType[] = [
    { label: t('fuelItem'), value: t(fuel) },
    { label: t('fullyRefueledItem'), value: fullyRefueled ? t('yes') : t('no') },
    { label: t('amountOfFuelItem'), value: `${amountOfFuel} ${capacityUnit}` },
    { label: t('unitPriceItem'), value: `${unitPrice} ${priceUnit}` },
    { label: t('sumPriceItem'), value: `${sumPrice.toFixed(2)} ${priceUnit}` },
    { label: t('avgConsItem'), value: `${avgConsumption?.toFixed(2) || '--'} ${capacityUnit}/100km`},
    { label: t('mileageItem'), value: `${mileage} ${distanceUnit}` },
    { label: t('noteItem'), value: note },
  ];

  return (
    <ListItem
      title={formatDate(date)}
      rowsData={refuelRowsData}
      href={{ pathname: '/edit-refuel/[id]', params: { id: refuel.id } }}
    />
  );
}

export default function RefuelsList() {

  const { t } = useTranslation();

  const { currentCar, getSortedRefuels } = useCarStore();

  if (!currentCar)
    return null;

  const refuelItems = getSortedRefuels().map(refuel => (
    <RefuelItem key={refuel.id} refuel={refuel} />
  ));

  useEffect(() => {}, [currentCar.refuels])

  return (
    <ListView title={t('refuelsTitle')} addHref="./add-refuel" node={refuelItems} />
  );
};
