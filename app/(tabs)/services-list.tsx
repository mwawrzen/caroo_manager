import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import { formatDate } from "@/utils/format-date";
import { InfoRowType } from "@/utils/types";
import { useEffect } from "react";

function ServiceItem({ service }: { service: any }) {

  const { createdDate, status, description, mileage, price, note } = service;

  if (!createdDate)
    return null;

  const serviceRowsData: InfoRowType[] = [
    { label: 'Status:', value: String(status) },
    { label: 'Mileage', value: `${mileage} Km` },
    { label: 'Price:', value: `${price} USD` },
    { label: 'Description:', value: description, column: true },
    { label: 'Note:', value: note, column: true },
  ];

  //TODO: make date format nice
  return <InfoList title={formatDate(createdDate)} rowsData={serviceRowsData} />
}

export default function ServicesList() {

  const { currentCar, getSortedServices } = useCarStore();

  if (!currentCar)
    return null;

  const serviceItems = getSortedServices().map(service => (
    <ServiceItem key={service.id} service={service} />
  ));

  useEffect(() => {}, [currentCar.services])

  return (
    <ListView title="Services" addHref="./add-service" items={serviceItems} />
  );
};
