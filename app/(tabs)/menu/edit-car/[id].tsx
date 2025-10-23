import AddCarForm from "@/components/add-car-form";
import { ThemedView } from "@/components/themed/themed-view";
import useCarStore from "@/store/car-store";
import { Car } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";

export default function EditCar() {

  const { id } = useLocalSearchParams();
  const { cars } = useCarStore();

  const editableCar: Car | null = cars.find(car => car.id === id) || null;

  return (
    <ThemedView style={{ flex: 1 }}>
      <AddCarForm car={editableCar} />
    </ThemedView>
  );
};
