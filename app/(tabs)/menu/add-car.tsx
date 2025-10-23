import AddCarForm from "@/components/add-car-form";
import { ThemedView } from "@/components/themed/themed-view";

export default function AddCar() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <AddCarForm />
    </ThemedView>
  );
};
