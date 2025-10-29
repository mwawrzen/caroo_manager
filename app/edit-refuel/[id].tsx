import RefuelForm from "@/components/refuel-form";
import useCarStore from "@/store/car-store";
import { Refuel } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";

export default function EditService() {

  const { id } = useLocalSearchParams();
  const { getRefuelById } = useCarStore();

  const editableRefuel: Refuel | null = getRefuelById(String(id));

  if (!editableRefuel)
    return null;

  return <RefuelForm refuel={editableRefuel} />;
};
