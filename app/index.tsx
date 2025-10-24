import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import { altFuelTypes, fuelTypes } from "@/utils/data";
import { PriceUnitEnum } from "@/utils/types";
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
        {value}
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
  return (
    <ThemedView style={styles.detailedItemBox}>
      {
        label ?
          <ThemedText style={styles.detailedItemLabel}>
            {label}
          </ThemedText> : null
      }
      <ThemedView style={styles.detailedRow}>
        <ThemedText
          lightColor={Colors['dark']['text']}
          style={ styles.detailedItemNumber }
        >
          {value}
        </ThemedText>
        <ThemedText
          lightColor={Colors['dark']['text']}
          style={styles.detailedItemUnit}
        >
          {PriceUnitEnum.USD}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function Index() {

  const { currentCar, getServicesSumPrice } = useCarStore();

  if (!currentCar)
    return null;

  const fuelType: string = fuelTypes.find(type => type.value === currentCar.fuel)?.label || '';
  const altFuelType: string = altFuelTypes.find(type => type.value === currentCar.altFuel)?.label || '';
  const servicesSumPrice = getServicesSumPrice();

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
            <InfoBox value={11.34} label="L / 100km" />
            <InfoBox value={42.19} label="zł / 100km" />
          </InfoRow>
          <InfoRow title="Summary for refuels">
            <DetailedInfoBox value={13459.34} label={fuelType} />
            { altFuelType ? <DetailedInfoBox value={8993.50} label={altFuelType} /> : null }
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
    gap: 6
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
