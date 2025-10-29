import FormCheckbox from "@/components/ui/form/form-checkbox";
import { FormCheckBoxGroup } from "@/components/ui/form/form-checkbox-group";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { statusTypes } from "@/utils/data";
import { ListItemRowType, ListItemType, Service, ServiceStatusEnum } from "@/utils/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ServicesList() {

  const { t } = useTranslation();

  const { currentCar, getSortedServices } = useCarStore();
  const { distanceUnit, priceUnit } = usePreferencesStore();

  const [services, setServices] = useState<Service[]>(getSortedServices());
  const [activeFilters, setActiveFilters] = useState<ServiceStatusEnum[]>([
    ServiceStatusEnum.PLANNED,
    ServiceStatusEnum.SCHEDULDED,
    ServiceStatusEnum.COMPLETED,
  ]);

  if (!currentCar)
    return null;

  const data: ListItemType[] = services.map(service => {
    const { id, createdDate, status, date, description, mileage, price, note } = service;

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

    return {
      title: date?.toLocaleDateString() || '',
      href: {pathname: '/edit-service/[id]', params: { id }},
      rows: serviceRowsData
    };
  });

  function updateFilters(value: ServiceStatusEnum) {

    const index = activeFilters.findIndex(filter => filter === value);
    const newFilters = [...activeFilters];

    if (index === -1 && activeFilters.length >= 1)
      newFilters.push(value);
    else if (activeFilters.length > 1)
      newFilters.splice(index, 1);

    setActiveFilters(newFilters);
  }

  const filter = (
    <FormCheckBoxGroup>
      {
        statusTypes.map(({ value }, i) => (
          <FormCheckbox
            key={i}
            label={t(value)}
            onPress={() => updateFilters(value)}
            checked={activeFilters.some(filter => filter === value)}
          />
        ))
      }
    </FormCheckBoxGroup>
  );

  useEffect(() => {}, [currentCar.services])

  useEffect(() => {
    setServices(getSortedServices().filter(service => activeFilters.includes(service.status)));
  }, [activeFilters]);

  return (
    <ListView
      title={t('servicesTitle')}
      addHref="./add-service"
      data={data}
      subheading={filter}
    />
  );
};
