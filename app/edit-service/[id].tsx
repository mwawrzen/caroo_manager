import ServiceForm from "@/components/service-form";
import useCarStore from "@/store/car-store";
import { Service } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";

export default function EditService() {

  const { id } = useLocalSearchParams();
  const { getServiceById } = useCarStore();

  const editableService: Service | null = getServiceById(String(id));

  if (!editableService)
    return null;

  return <ServiceForm service={editableService} />;
};
