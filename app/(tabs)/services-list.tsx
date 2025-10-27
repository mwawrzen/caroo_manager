import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { ListItemRowType, ListItemType, ServiceStatusEnum } from "@/utils/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ServicesList() {

  const { t } = useTranslation();

  const { currentCar, getSortedServices } = useCarStore();
  const { distanceUnit, priceUnit } = usePreferencesStore();

  if (!currentCar)
    return null;

  const data: ListItemType[] = getSortedServices().map(service => {
    const { createdDate, status, date, description, mileage, price, note } = service;

    const serviceRowsData: ListItemRowType[] = [
      { label: t('statusItem'), value: t(status) },
      { label: t('createdDateItem'), value: createdDate.toLocaleString() }
    ];

    if (price) {
      serviceRowsData.push({
        label: t('priceItem'),
        value: `${price} ${priceUnit}`
      });
    }

    if (mileage) {
      serviceRowsData.push({
        label: t('mileageItem'),
        value: `${mileage} ${distanceUnit}`
      });
    }

    serviceRowsData.push(
      { label: t('description'), value: description, column: true },
      { label: t('noteItem'), value: note, column: true }
    );

    return { title: date?.toLocaleDateString() || '', rows: serviceRowsData };
  });

  useEffect(() => {}, [currentCar.services])

  return (
    <ListView
      title={t('servicesTitle')}
      addHref="./add-service"
      data={data}
      filters={[
        {name: t(ServiceStatusEnum.PLANNED), value: ServiceStatusEnum.PLANNED},
        {name: t(ServiceStatusEnum.SCHEDULDED), value: ServiceStatusEnum.SCHEDULDED},
        {name: t(ServiceStatusEnum.COMPLETED), value: ServiceStatusEnum.COMPLETED}
      ]}
    />
  );
};
