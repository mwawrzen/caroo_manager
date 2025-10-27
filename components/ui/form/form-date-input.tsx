import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import ActionButton from "@/components/ui/button/action-button";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

type FormDateInputProps = {
  dateObj: Date;
};

export default function FormDateInput({ dateObj }: FormDateInputProps) {

  const { t } = useTranslation();
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(dateObj);

  const updateDate = (event: DateTimePickerEvent, newDate?: Date) => {
    if (newDate && event.type !== 'dismissed')
      setDate( newDate );
    setisOpen(false);
  };

  return (
    <ThemedView style={styles.dateContainer}>
      <ThemedView style={styles.dateRow}>
        <ThemedText type="subtitle" style={styles.dateText}>
          {date.toLocaleDateString()}
        </ThemedText>
        <ThemedView style={{}}>
          <ActionButton
            onPress={() => setisOpen(!isOpen)}
            value={t('changeDateButton')}
            style={styles.dateButton}
          />
        </ThemedView>
        { isOpen ? <RNDateTimePicker value={date} onChange={updateDate} display="spinner" /> : null }
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    gap: 10,
    marginVertical: 20
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%"
  },
  dateText: {
    textAlign: "right"
  },
  dateButton: {}
});
