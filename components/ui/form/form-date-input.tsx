import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { DateUnitEnum } from "@/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet } from "react-native";

type FormDateInputProps = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

export default function FormDateInput({ currentDate, setCurrentDate }: FormDateInputProps) {

  function updateDateUnitValue(dayUnit: DateUnitEnum, value: number) {

    const newDate = new Date(currentDate);

    switch (dayUnit) {
      case DateUnitEnum.DAY:
        newDate.setDate(currentDate.getDate() + value);
        break;
      case DateUnitEnum.MONTH:
        newDate.setMonth(currentDate.getMonth() + value);
        break;
      case DateUnitEnum.YEAR:
        newDate.setFullYear(currentDate.getFullYear() + value);
        break;
    }
    newDate.setHours(0, 0, 0, 0);
    setCurrentDate(newDate);
  }

  const dateUnits = [
    { name: DateUnitEnum.DAY, value: String(currentDate.getDate()).padStart(2, '0') },
    { name: DateUnitEnum.MONTH, value: String(currentDate.getMonth() + 1).padStart(2, '0') },
    { name: DateUnitEnum.YEAR, value: String(currentDate.getFullYear()) }
  ];

  const dateItems = dateUnits.map(({ name, value }, i) => {
    return (
      <ThemedView key={i} style={[
        styles.dateColumn,
        name === DateUnitEnum.YEAR ? styles.dateYearColumn : {}
      ]}>
        <Pressable onPress={()=>{updateDateUnitValue(name, 1)}}>
          <ThemedIcon name="chevron-up" style={styles.dateIcon}/>
        </Pressable>
        <ThemedText style={styles.dateText}>{value}</ThemedText>
        <Pressable onPress={()=>{updateDateUnitValue(name, -1)}}>
          <ThemedIcon name="chevron-down" style={styles.dateIcon}/>
        </Pressable>
      </ThemedView>
    );
  });

  return (
    <ThemedView style={styles.dateContainer}>
      {dateItems}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 20
  },
  dateColumn: {
    alignItems: "center",
    width: 40
  },
  dateYearColumn: {
    width: 60
  },
  dateIcon: {
    fontSize: 32
  },
  dateText: {
    fontSize: 22,
    lineHeight: 22,
    fontFamily: "Quicksand_700Bold"
  }
});
