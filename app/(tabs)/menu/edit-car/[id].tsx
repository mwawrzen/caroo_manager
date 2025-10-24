import EditCarForm from "@/components/edit-car-form";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { Car } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";

export default function EditCar() {

  const { id } = useLocalSearchParams();
  const { getCarById } = useCarStore();

  const editableCar: Car | null = getCarById(String(id));

  if (!editableCar)
    return null;

  return (
    <ThemedView style={{ flex: 1 }}>
      <EditCarForm car={editableCar} />
    </ThemedView>
  );
};
