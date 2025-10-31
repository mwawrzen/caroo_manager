import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import useCarStore from "@/store/car-store";
import usePreferencesStore from "@/store/preferences-store";
import { FuelEnum } from "@/utils/types";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
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
        {value ? value.toFixed(2) : "--.--"}
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

  const { t } = useTranslation();

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

  const avgConsumption = getAvgConsumption();
  const avgConsumptionPrice = getAvgConsumptionPrice();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.buttonGroup}>
            <Link href="/add-service" asChild>
              <Pressable>
                <ThemedView style={styles.button}>
                  <ThemedIcon name="plus" style={styles.buttonPlus} />
                  <ThemedIcon name="wrench" style={styles.buttonIcon} />
                </ThemedView>
              </Pressable>
            </Link>
            <Link href="/add-refuel" asChild>
              <Pressable>
                <ThemedView style={styles.button}>
                  <ThemedIcon name="plus" style={styles.buttonPlus} />
                  <ThemedIcon name="gas-pump" style={styles.buttonIcon} />
                </ThemedView>
              </Pressable>
            </Link>
          </ThemedView>
          <InfoRow title={t('generalInfoTitle')}>
            <InfoBox value={avgConsumption} label={`${capacityUnit} / 100${distanceUnit}`} />
            <InfoBox value={avgConsumptionPrice} label={`${priceUnit} / ${distanceUnit}`} />
          </InfoRow>
          <InfoRow title={t('summaryRefuelsTitle')}>
            { altFuelType ? <DetailedInfoBox value={altFuelRefuelSumPrice} label={t(altFuelType)} /> : null }
            <DetailedInfoBox value={fuelRefuelSumPrice} label={t(fuelType)} />
          </InfoRow>
          <InfoRow title={t('summaryServicesTitle')}>
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
    gap: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "80%",
    marginBottom: 10
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  buttonPlus: {
    fontSize: 12
  },
  buttonIcon: {
    fontSize: 24
  },
  buttonText: {
    textAlign: "center"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    maxWidth: 600
  },
  itemBox: {
    width: "40%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "orangered"
  },
  itemNumber: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 58,
    textAlign: "center",
    lineHeight: 76
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
