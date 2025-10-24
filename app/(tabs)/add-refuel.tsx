import Form from "@/components/form";
import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import useCarStore from "@/store/car-store";
import { checkStringIsDouble } from "@/utils/check-double-string";
import { getValidatedMileage } from "@/utils/data";
import { FuelEnum } from "@/utils/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

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
  const [isFullyRefueled, setIsFullyRefueled] = useState<boolean>(false);
  const [note, setNote] = useState<string>('');

  const statusTypeOptions = fuelTypes.map(({ icon, label, value }) => {
    if (![currentCar.fuel, currentCar.altFuel].includes(value))
      return null;
    return (
      <Form.Radio
        key={label}
        icon={icon}
        label={label}
        value={value}
        isActive={fuelType === label.toLowerCase()}
        onPress={setFuelType}
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
      fullyRefueled: isFullyRefueled,
      note
    });
    setIsFullyRefueled(true);
    if (router.canGoBack())
      router.back();
  }

  return (
    <Form title="Add refuel">
      <Form.RadioGroup>
        {statusTypeOptions}
      </Form.RadioGroup>
      <Form.Checkbox
        label="Fully refueled"
        onPress={() => setIsFullyRefueled(!isFullyRefueled)}
        checked={isFullyRefueled}
      />
      <Form.InputUnit
        value={unitPrice}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setUnitPrice(val) : {}}
        placeholder="Enter unit price"
        keyboardType="numeric"
        unit="USD"
      />
      <Form.InputUnit
        value={fuelAmount}
        onChangeText={(val: string) => checkStringIsDouble(val) ? setFuelAmount(val) : {}}
        placeholder="Enter amount of fuel"
        keyboardType="numeric"
        unit="L"
      />
      <Form.InputUnit
        value={mileage}
        onChangeText={(val: string) => setMileage(getValidatedMileage(val))}
        placeholder="Enter mileage"
        keyboardType="numeric"
        unit="Km"
      />
      <Form.Input
        value={note}
        onChangeText={setNote}
        placeholder="Enter note"
      />
      <Form.Submit onPress={handleAddRefuel} />
    </Form>
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
