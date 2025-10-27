import EditCarForm from "@/components/edit-car-form";
import useCarStore from "@/store/car-store";
import { Car } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";

export default function EditCar() {

  const { id } = useLocalSearchParams();
  const { getCarById } = useCarStore();

  const editableCar: Car | null = getCarById(String(id));

  if (!editableCar)
    return null;

  return <EditCarForm car={editableCar} />;
};
