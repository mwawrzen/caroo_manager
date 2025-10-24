import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import useCarStore from "@/store/car-store";
import { checkStringIsDouble } from "@/utils/check-double-string";
import { checkStringIsInt } from "@/utils/check-int-string";
import { FuelEnum } from "@/utils/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

type FuelType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: FuelEnum;
};

type FuelTypeProps = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  isActive: boolean;
  setFuel: any; //!TEMP
};

const fuelTypes: FuelType[] = [
  { icon: 'gas-pump', label: 'Petrol', value: FuelEnum.PETROL },
  { icon: 'droplet', label: 'Diesel', value: FuelEnum.DIESEL },
  { icon: 'fire', label: 'Gas', value: FuelEnum.GAS },
  { icon: 'bolt-lightning', label: 'Electric', value: FuelEnum.ELECTRIC }
];

function FuelType({ icon, label, isActive, setFuel }: FuelTypeProps) {

  const opositeColorScheme = useOpositeColorScheme();
  const activeStyles = isActive ? { color: Colors[opositeColorScheme]['text'] } : {};

  return (
    <Pressable onPress={() => setFuel( label.toLowerCase() )} style={[
      styles.serviceTypeContainer,
      isActive ? { backgroundColor: "orangered" } : null
    ]}>
      <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
        <ThemedIcon name={icon} style={[ styles.serviceStatusIcon, activeStyles]} />
        <ThemedText style={[styles.serviceStatusLabel, activeStyles]}>{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export default function AddRefuel() {

  const { currentCar, addRefuel } = useCarStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [unitPrice, setUnitPrice] = useState<string>(""); //! number
  const [fuelAmount, setFuelAmount] = useState<string>(""); //! number
  const [fuelType, setFuelType] = useState<FuelEnum>(currentCar.fuel); //! current car
  const [mileage, setMileage] = useState<string>(String(currentCar.mileage)); //!  number
  const [note, setNote] = useState<string>('');

  const statusTypeOptions = fuelTypes.map(({ icon, label, value }) => {
    if (![currentCar.fuel, currentCar.altFuel].includes(value))
      return null;
    return (
      <FuelType
        key={label}
        icon={icon}
        label={label}
        isActive={fuelType === label.toLowerCase()}
        setFuel={setFuelType}
      />
    );
  });

  function handleAddRefuel() { //TODO form validation
    if (!currentCar)
      return null;
    addRefuel(currentCar.id, {
      unitPrice: Number(unitPrice),
      amountOfFuel: Number(fuelAmount),
      fuel: fuelType,
      mileage: Number(mileage),
      note
    });
    if (router.canGoBack())
      router.back();
  }

  function handleSetMileage(value: string) {
    if (value === "")
      setMileage("");
    else if(checkStringIsInt(value) && Number(value) > 0)
      setMileage(value);
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.heading}>Add refuel</ThemedText>
          <ThemedView style={styles.formContainer}>
            <ThemedText style={{ textAlign: "center" }}>Fuel type</ThemedText>
            <ThemedView style={styles.statusContainer}>
              {statusTypeOptions}
            </ThemedView>
            <ThemedView style={styles.inputRow}>
              <ThemedTextInput
                style={styles.input}
                onChangeText={v => checkStringIsDouble(v) ? setUnitPrice(v) : {}}
                value={unitPrice}
                keyboardType="numeric"
                placeholder="Enter unit price"
              />
              <ThemedText style={styles.inputUnit}>USD</ThemedText>
            </ThemedView>
            <ThemedView style={styles.inputRow}>
              <ThemedTextInput
                style={styles.input}
                onChangeText={v => checkStringIsDouble(v) ? setFuelAmount(v) : {}}
                value={fuelAmount}
                keyboardType="numeric"
                placeholder="Enter amount of fuel"
              />
              <ThemedText style={styles.inputUnit}>L</ThemedText>
            </ThemedView>
            <ThemedView style={styles.inputRow}>
              <ThemedTextInput
                style={styles.input}
                onChangeText={handleSetMileage}
                value={mileage}
                keyboardType="numeric"
                placeholder="Enter mileage"
              />
              <ThemedText style={styles.inputUnit}>Km</ThemedText>
            </ThemedView>
            <ThemedTextInput
              style={styles.input}
              onChangeText={setNote}
              value={note}
              placeholder="Enter note"
            />
            <Pressable onPress={handleAddRefuel}>
              <ThemedView style={styles.submitContainer}>
                <ThemedText lightColor={Colors['dark']['text']} style={styles.submit}>
                  Ready
                </ThemedText>
              </ThemedView>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  heading: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 20
  },
  formContainer: {
    gap: 12
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  input: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
  },
  inputUnit: {
    width: "18%",
    fontFamily: "Quicksand_700Bold",
    fontSize: 28
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  serviceTypeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    padding: 10,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  serviceStatusIcon: {
    fontSize: 22
  },
  serviceStatusLabel: {
    fontSize: 14
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 22,
    backgroundColor: "orangered"
  },
  submit: {
    fontSize: 22
  }
});
