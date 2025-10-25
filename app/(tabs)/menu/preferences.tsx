import Form from "@/components/form";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import usePreferencesStore from "@/store/preferences-store";
import { availableLanguages, availableUnits } from "@/utils/data";
import { LangEnum } from "@/utils/types";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Languages } from 'react-native-svg-circle-country-flags';

export default function Preferences() {

  (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Language</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.ENGLISH )}>
          <Languages.Uk width={50} height={50} />
        </Pressable>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.POLISH )}>
          <Languages.Pl width={50} height={50} />
        </Pressable>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.GERMAN )}>
          <Languages.De width={50} height={50} />
        </Pressable>
      </ThemedView>
      <ThemedText type="subtitle">Units</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>km</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>mi</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>GBP</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>PLN</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>EUR</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>Gallons</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={()=>{}}>
          <ThemedText style={styles.unitText}>Liters</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  )

  const {
    language, priceUnit, capacityUnit, distanceUnit,
    setLanguage, setPriceUnit, setDistanceUnit, setCapacityUnit
  } = usePreferencesStore();

  const languageItems = availableLanguages.map((lang, i) => (
    <Form.RadioLang
      key={i}
      value={lang}
      isActive={lang === language}
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
      label={unit.label}
      value={unit.value}
      isActive={unit.value === distanceUnit}
      onPress={setDistanceUnit}
    />
  ));

  const capacityUnitItems = availableUnits.capacityUnits.map((unit, i) => (
    <Form.Radio
      key={i}
      label={unit.label}
      value={unit.value}
      isActive={unit.value === capacityUnit}
      onPress={setCapacityUnit}
    />
  ));

  return (
    <Form title="Preferences">
      <Form.RadioGroup>
        {languageItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>Currency unit</ThemedText>
      <Form.RadioGroup>
        {priceUnitItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>Distance unit</ThemedText>
      <Form.RadioGroup>
        {distanceUnitItems}
      </Form.RadioGroup>
      <ThemedText style={styles.subtitle}>Capacity unit</ThemedText>
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
