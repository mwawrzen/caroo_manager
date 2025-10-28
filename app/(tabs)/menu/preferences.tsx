import { ThemedText } from "@/components/themed/themed-text";
import Form from "@/components/ui/form/form";
import usePreferencesStore from "@/store/preferences-store";
import { availableLanguages, availableUnits } from "@/utils/data";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Preferences() {

  const { t } = useTranslation();

  const {
    language, priceUnit, capacityUnit, distanceUnit,
    setLanguage, setPriceUnit, setDistanceUnit, setCapacityUnit
  } = usePreferencesStore();

  const languageItems = availableLanguages.map((lang, i) => (
    <Form.RadioLang
      key={i}
      value={lang.name}
      isActive={lang.name === language}
      onPress={setLanguage}
    />
  ));

  const priceUnitItems = availableUnits.priceUnits.map((unit, i) => (
    <Form.Radio
      key={i}
      label={unit.label}
      value={unit.value}
      isActive={unit.value === priceUnit}
      onPress={setPriceUnit}
    />
  ));

  const distanceUnitItems = availableUnits.distanceUnits.map((unit, i) => (
    <Form.Radio
      key={i}
      label={t(unit)}
      value={unit}
      isActive={unit === distanceUnit}
      onPress={setDistanceUnit}
    />
  ));

  const capacityUnitItems = availableUnits.capacityUnits.map((unit, i) => (
    <Form.Radio
      key={i}
      label={t(unit)}
      value={unit}
      isActive={unit === capacityUnit}
      onPress={setCapacityUnit}
    />
  ));

  return (
    <Form title="Preferences">
      <Form.RadioGroup>
        {languageItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>{t('currencyUnit')}</ThemedText>
      <Form.RadioGroup>
        {priceUnitItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>{t('distanceUnit')}</ThemedText>
      <Form.RadioGroup>
        {distanceUnitItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>{t('capacityUnit')}</ThemedText>
      <Form.RadioGroup>
        {capacityUnitItems}
      </Form.RadioGroup>
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  sectionContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10
  },
  languageButton: {
    borderWidth: 4,
    borderColor: "orangered",
    borderRadius: "50%"
  },
  unitButton: {
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 14
  },
  unitText: {
    fontSize: 22
  },
  subtitle: {
    textAlign: "center"
  }
});
