import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import ActionButton from "@/components/ui/button/action-button";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

type FormDateInputProps = {
  dateObj: Date;
  setDate: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

export default function FormDateInput({ dateObj, setDate }: FormDateInputProps) {

  const { t } = useTranslation();
  const [isOpen, setisOpen] = useState<boolean>(false);
  // const [newDate, setNewDate] = useState<Date>(dateObj);

  const updateDate = (event: DateTimePickerEvent, date?: Date) => {
    if (date && event.type !== 'dismissed')
      setDate( date );
    setisOpen(false);
  };

  return (
    <ThemedView style={styles.dateContainer}>
      <ThemedView style={styles.dateRow}>
        <ThemedText type="subtitle" style={styles.dateText}>
          {dateObj.toLocaleDateString()}
        </ThemedText>
        <ThemedView style={{}}>
          <ActionButton
            onPress={() => setisOpen(!isOpen)}
            value={t('changeDateButton')}
            style={styles.dateButton}
          />
        </ThemedView>
        { isOpen ? <RNDateTimePicker value={dateObj} onChange={updateDate} display="spinner" /> : null }
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
