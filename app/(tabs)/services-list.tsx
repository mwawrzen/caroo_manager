import InfoList from "@/components/ui/list/info-list";
import ListView from "@/components/ui/list/list-view";
import useCarStore from "@/store/car-store";
import { InfoRowType } from "@/utils/types";

function ServiceItem({ service }: { service: any }) {

  const { date, status, description, mileage, price, note } = service;

  if (!date)
    return null;

  const serviceRowsData: InfoRowType[] = [
    { label: 'Status:', value: String(status) },
    { label: 'Mileage', value: `${mileage} Km` },
    { label: 'Price:', value: `${price} USD` },
    { label: 'Description:', value: description, column: true },
    { label: 'Note:', value: note, column: true },
  ];

  //TODO: make date format nice
  return <InfoList title={date.toLocaleString().split(',')[0]} rowsData={serviceRowsData} />
}

export default function ServicesList() {

  const { currentCar } = useCarStore();

  if (!currentCar)
    return null;

  const serviceItems = currentCar.services.map(service => (
    <ServiceItem key={service.id} service={service} />
  ));

  return (
    <ListView title="Services" addHref="./add-service" items={serviceItems} />
  );
};
