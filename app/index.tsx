import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { FuelEnum } from "@/utils/types";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

type InfoRowProps = {
  title?: string;
  children: ReactNode;
};

function InfoRow({ title, children }: InfoRowProps) {
  return (
    <>
      { title ? <ThemedText type="subtitle">{title}</ThemedText> : null }
      <ThemedView style={styles.infoRow}>
        {children}
      </ThemedView>
    </>
  );
}

type InfoBoxProps = {
  value: number;
  label?: string;
};


function InfoBox({ value, label }: InfoBoxProps) {
  return (
    <ThemedView style={styles.itemBox}>
      <ThemedText
        lightColor={Colors['dark']['text']}
        style={ styles.itemNumber }
      >
        {value.toFixed(2) || "--.--"}
      </ThemedText>
      {
        label ?
          <ThemedText
            lightColor={Colors['dark']['text']}
            style={styles.itemUnit}
          >
            {label}
          </ThemedText> : null
      }
    </ThemedView>
  );
}

type DetailedInfoBoxProps = InfoBoxProps;

function DetailedInfoBox({ value, label }: DetailedInfoBoxProps) {

  const { priceUnit } = usePreferencesStore();

  return (
    <ThemedView style={styles.detailedItemBox}>
      {
        label ?
          <ThemedText style={styles.detailedItemLabel}>
            {label}
          </ThemedText> : null
      }
      <ThemedView style={styles.detailedRow}>
        <ThemedText style={ styles.detailedItemNumber }>
          {value.toFixed(2)}
        </ThemedText>
        <ThemedText style={styles.detailedItemUnit}>
          {priceUnit}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function Index() {

  const {
    currentCar,
    getServicesTotalPrice,
    getRefuelsTotalPrice,
    getAvgConsumption,
    getAvgConsumptionPrice
  } = useCarStore();
  const { capacityUnit, priceUnit, distanceUnit } = usePreferencesStore();

  if (!currentCar)
    return null;

  const fuelType: FuelEnum = currentCar.fuel;
  const altFuelType: FuelEnum | null = currentCar.altFuel || null;
  const servicesSumPrice = getServicesTotalPrice();
  const fuelRefuelSumPrice = getRefuelsTotalPrice( fuelType );
  const altFuelRefuelSumPrice = altFuelType ? getRefuelsTotalPrice( altFuelType ) : 0;

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.buttonGroup}>
            <Link href="/add-service" asChild>
              <Pressable>
                <ThemedView style={styles.button}>
                  <ThemedIcon name="wrench" style={styles.buttonIcon} />
                  <ThemedText>Add service</ThemedText>
                </ThemedView>
              </Pressable>
            </Link>
            <Link href="/add-refuel" asChild>
              <Pressable>
                <ThemedView style={styles.button}>
                  <ThemedIcon name="gas-pump" style={styles.buttonIcon} />
                  <ThemedText type="default">Add refuel</ThemedText>
                </ThemedView>
              </Pressable>
            </Link>
          </ThemedView>
          <InfoRow title="General info">
            <InfoBox value={getAvgConsumption()} label={`${capacityUnit} / 100${distanceUnit}`} />
            <InfoBox value={getAvgConsumptionPrice()} label={`${priceUnit} / ${distanceUnit}`} />
          </InfoRow>
          <InfoRow title="Summary for refuels">
            { altFuelType ? <DetailedInfoBox value={altFuelRefuelSumPrice} label={altFuelType} /> : null }
            <DetailedInfoBox value={fuelRefuelSumPrice} label={fuelType} />
          </InfoRow>
          <InfoRow title="Summary for services">
            <DetailedInfoBox value={servicesSumPrice} />
          </InfoRow>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10
  },
  button: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  buttonIcon: {
    fontSize: 20
  },
  infoRow: {
    flexDirection: "row",
    gap: 20
  },
  itemBox: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "orangered"
  },
  itemNumber: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 64,
    textAlign: "center",
    lineHeight: 76
  },
  itemNumberSmaller: {
    fontSize: 20,
    lineHeight: 28
  },
  itemUnit: {
    fontSize: 20,
    textAlign: "center"
  },
  detailedItemBox: {
    paddingTop: 10,
    paddingBottom: 12,
    width: "40%",
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  detailedRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "transparent"
  },
  detailedItemNumber: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20
  },
  detailedItemUnit: {
    fontSize: 20
  },
  detailedItemLabel: {
    textAlign: "center",
    fontSize: 24,
    paddingBottom: 2
  }
});
