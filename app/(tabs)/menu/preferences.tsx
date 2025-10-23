import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { DistanceUnitEnum, LangEnum } from "@/utils/types";
import { Pressable, StyleSheet } from "react-native";
import { De, Gb, Pl } from 'react-native-svg-circle-country-flags';

export default function Preferences() {

  function setLanguage(lang: LangEnum) {

  }

  function setDistanceUnit(unit: DistanceUnitEnum) {

  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Language</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.ENGLISH )}>
          <Gb width={50} height={50} />
        </Pressable>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.POLISH )}>
          <Pl width={50} height={50} />
        </Pressable>
        <Pressable style={styles.languageButton} onPress={() => setLanguage( LangEnum.GERMAN )}>
          <De width={50} height={50} />
        </Pressable>
      </ThemedView>
      <ThemedText type="subtitle">Units</ThemedText>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.KM )}>
          <ThemedText style={styles.unitText}>km</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.MI )}>
          <ThemedText style={styles.unitText}>mi</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.KM )}>
          <ThemedText style={styles.unitText}>GBP</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.MI )}>
          <ThemedText style={styles.unitText}>PLN</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.MI )}>
          <ThemedText style={styles.unitText}>EUR</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.sectionContainer}>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.KM )}>
          <ThemedText style={styles.unitText}>Gallons</ThemedText>
        </Pressable>
        <Pressable style={styles.unitButton} onPress={() => setDistanceUnit( DistanceUnitEnum.MI )}>
          <ThemedText style={styles.unitText}>Liters</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
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
  }
});
