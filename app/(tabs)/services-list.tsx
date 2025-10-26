import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { formatDate } from "@/utils/format-date";
import { InfoRowType } from "@/utils/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ServiceItem({ service }: { service: any }) {

  const { t } = useTranslation();

  const { createdDate, status, description, mileage, price, note } = service;
  const { distanceUnit, priceUnit } = usePreferencesStore();

  const serviceRowsData: InfoRowType[] = [
    { label: t('statusItem'), value: t(status) },
    { label: t('mileageItem'), value: `${mileage} ${distanceUnit}` },
    { label: t('priceItem'), value: `${price} ${priceUnit}` },
    { label: t('description'), value: description, column: true },
    { label: t('noteItem'), value: note, column: true },
  ];

  //TODO: make date format nice
  return <InfoList title={formatDate(createdDate)} rowsData={serviceRowsData} />
}

export default function ServicesList() {

  const { t } = useTranslation();

  const { currentCar, getSortedServices } = useCarStore();

  if (!currentCar)
    return null;

  const serviceItems = getSortedServices().map(service => (
    <ServiceItem key={service.id} service={service} />
  ));

  useEffect(() => {}, [currentCar.services])

  return (
    <ListView title={t('servicesTitle')} addHref="./add-service" items={serviceItems} />
  );
};
