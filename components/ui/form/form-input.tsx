import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { checkStringIsFloat } from "@/utils/check-float-string";
import { checkStringIsInt } from "@/utils/check-int-string";
import { MAX_TEXT_LENGTH } from "@/utils/data";
import { FormInputTypeEnum } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInputProps } from "react-native";

type FormInputProps = TextInputProps & {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>> | ((value: string) => void);
  placeholder?: string;
  unit?: string;
  type?: FormInputTypeEnum;
};

export default function FormInput({
  value,
  onChangeText,
  placeholder = '',
  unit,
  type = FormInputTypeEnum.TEXT,
  ...rest
}: FormInputProps) {

  function handleInput(text: string) {
    switch(type) {
      case FormInputTypeEnum.TEXT:
        if (text.length <= MAX_TEXT_LENGTH)
          onChangeText(text);
        break;
      case FormInputTypeEnum.INT:
        if (checkStringIsInt(text))
          onChangeText(text);
        break;
      case FormInputTypeEnum.FLOAT:
        if (checkStringIsFloat(text))
          onChangeText(text);
        break;
    }
  }

  return (
    <ThemedView style={styles.inputRow}>
      <ThemedTextInput
        style={styles.input}
        value={value}
        onChangeText={handleInput}
        placeholder={placeholder}
        multiline={ type === FormInputTypeEnum.TEXT }
        {...rest}
      />
      { unit ? <ThemedText style={styles.inputUnit}>{unit}</ThemedText> : null }
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  inputUnit: {
    width: "18%",
    fontFamily: "Quicksand_700Bold",
    fontSize: 28
  }
});
