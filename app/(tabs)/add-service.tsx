import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import useCarStore from "@/store/car-store";
import { ServiceStatusEnum } from "@/utils/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

type StatusType = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  value: ServiceStatusEnum;
};

type StatusTypeProps = {
  icon: keyof typeof FontAwesome6.glyphMap,
  label: string,
  isActive: boolean;
  setStatus: any; //!TEMP
};

const statusTypes: StatusType[] = [
  { icon: 'stopwatch', label: 'Planned', value: ServiceStatusEnum.PLANNED },
  { icon: 'calendar-days', label: 'Schedulded', value: ServiceStatusEnum.SCHEDULDED }
];

function StatusType({ icon, label, isActive, setStatus }: StatusTypeProps) {

  const opositeColorScheme = useOpositeColorScheme();
  const activeStyles = isActive ? { color: Colors[opositeColorScheme]['text'] } : {};

  return (
    <Pressable onPress={() => setStatus( label.toLowerCase() )} style={[
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

export default function AddService() {

  const { currentCar, addService } = useCarStore();

  if (!currentCar)
    return null;

  const router = useRouter();

  const [serviceDescription, setServiceDescription] = useState<string>('');
  const [serviceNote, setServiceNote] = useState<string>('');
  const [serviceStatus, setServiceStatus] =
    useState<ServiceStatusEnum.PLANNED | ServiceStatusEnum.SCHEDULDED>(ServiceStatusEnum.PLANNED);

  const statusTypeOptions = statusTypes.map(({ icon, label }) => {
    return (
      <StatusType
        key={label}
        icon={icon}
        label={label}
        isActive={serviceStatus === label.toLowerCase()}
        setStatus={setServiceStatus}
      />
    );
  });

  function handleAddService() { //TODO form validation
    if (!currentCar)
      return null;
    addService(currentCar.id, {
      status: serviceStatus,
      description: serviceDescription,
      note: serviceNote
    });
    if (router.canGoBack())
      router.back();
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.heading}>Add service</ThemedText>
          <ThemedView style={styles.formContainer}>
            <ThemedText style={{ textAlign: "center" }}>Primary fuel</ThemedText>
            <ThemedView style={styles.statusContainer}>
              {statusTypeOptions}
            </ThemedView>
            <ThemedTextInput
              style={styles.input}
              onChangeText={setServiceDescription}
              value={serviceDescription}
              placeholder="Enter description"
            />
            <ThemedTextInput
              style={styles.input}
              onChangeText={setServiceNote}
              value={serviceNote}
              placeholder="Enter note"
            />
            <Pressable onPress={handleAddService}>
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
  input: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
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
