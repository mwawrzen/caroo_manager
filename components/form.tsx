import { ThemedText } from "@/components/themed/themed-text";
import { ThemedTextInput } from "@/components/themed/themed-text-input";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import { LangEnum, UnitEnumType } from "@/utils/types";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Pressable, ScrollView, StyleSheet, TextInputProps } from "react-native";
import { De, Pl, Us } from "react-native-svg-circle-country-flags";
import { ThemedIcon } from "./themed/themed-icon";

type FormInputProps = TextInputProps & {
  value: string;
  onChangeText: Dispatch<SetStateAction<string>> | ((value: string) => void);
  placeholder?: string;
  withUnit?: boolean;
};

Form.Input = function FormInput({
  value,
  onChangeText,
  placeholder = '',
  withUnit = false,
  ...rest
}: FormInputProps) {
  return (
    <ThemedTextInput
      style={[ styles.input, withUnit ? { flexGrow: 1 } : {}]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...rest}
    />
  );
};

// Form.InputUnit

type FormInputUnitProps = FormInputProps & {
  unit: UnitEnumType;
};

Form.InputUnit = function FormInputUnit({
  value,
  onChangeText,
  placeholder = '',
  unit,
  ...rest
}: FormInputUnitProps) {
  return (
    <ThemedView style={styles.inputRow}>
      <Form.Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        withUnit
        {...rest}
      />
      <ThemedText style={styles.inputUnit}>{unit}</ThemedText>
    </ThemedView>
  );
}

// Form.RadioGroup

type FormRadioGroupProps = {
  title?: string;
  children: ReactNode;
};

Form.RadioGroup = function FormRadioGroup({
  title = '',
  children
}: FormRadioGroupProps) {
  return (
    <>
      { title ? <ThemedText style={{ textAlign: "center" }}>{title}</ThemedText> : null }
      <ThemedView style={styles.radioGroup}>
        {children}
      </ThemedView>
    </>
  );
};

// Form.RadioGroup -> Radio

type FormRadioProps = {
  icon?: keyof typeof FontAwesome6.glyphMap,
  label: string;
  value: string;
  isActive?: boolean;
  onPress: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

Form.Radio = function FormRadio({
  icon,
  label,
  value,
  isActive,
  onPress
}: FormRadioProps) {

  const opositeColorScheme = useOpositeColorScheme();
  const activeStyles = isActive ? { color: Colors[opositeColorScheme]['text'] } : {};

  return (
    <Pressable onPress={() => onPress(value)} style={[
      styles.radio,
      isActive ? { backgroundColor: "orangered" } : null
    ]}>
      <ThemedView style={{ alignItems: "center", backgroundColor: "transparent" }}>
        { icon ? <ThemedIcon name={icon} style={[ styles.radioIcon, activeStyles]} /> : null }
        <ThemedText
          style={[ icon ? styles.radioLabel : styles.radioLabelNoIcon, activeStyles]}
        >
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

// Form.RadioLang

type FormRadioLangProps = {
  value: string;
  isActive?: boolean;
  onPress: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

Form.RadioLang = function FormRadioLang({
  value,
  isActive,
  onPress
}: FormRadioLangProps) {

  const activeStyles = isActive ? { backgroundColor: "orangered" } : {};

  const langs = [
    { value: LangEnum.ENGLISH, flag: <Us width={50} height={50} /> },
    { value: LangEnum.POLISH, flag: <Pl width={50} height={50} /> },
    { value: LangEnum.GERMAN, flag: <De width={50} height={50} /> },
  ];

  const flag = langs.find(lang => lang.value === value)?.flag || langs[0].flag;
  return (
    <Pressable style={[ styles.language, activeStyles ]} onPress={() => onPress(value)}>
      {flag}
    </Pressable>
  );
}

// Form.Checkbox

type FormCheckboxProps = {
  label: string;
  onPress: () => void;
  checked: boolean;
};

Form.Checkbox = function FormCheckbox({ label, onPress, checked = true }: FormCheckboxProps) {
  return (
    <ThemedView style={styles.checkboxContainer}>
      <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
      <Pressable onPress={onPress}>
        <ThemedView style={styles.checkbox}>
          { checked ? <ThemedView style={styles.checkboxIndicator} /> : null }
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

// Form.Submit

type FormSubmitType = {
  onPress: () => void;
};

Form.Submit = function FormSubmit({ onPress }: FormSubmitType) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.submitContainer}>
        <ThemedText lightColor={Colors['dark']['text']} style={styles.submit}>
          Ready
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
};

type FormProps = {
  title: string;
  children: ReactNode;
};

export default function Form({
  title = 'Form',
  children
}: FormProps) {

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView>
        <ThemedView style={styles.container}>
          <ThemedText style={styles.heading}>{title}</ThemedText>
          <ThemedView style={styles.formContainer}>
            {children}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  heading: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 30
  },
  formContainer: {
    gap: 12,
    width: "100%",
    maxWidth: 600
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },
  input: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "orangered",
    fontSize: 20
  },
  inputUnit: {
    width: "18%",
    fontFamily: "Quicksand_700Bold",
    fontSize: 28
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10
  },
  radio: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    padding: 10,
    borderWidth: 2,
    borderColor: "orangered",
    borderRadius: 20
  },
  radioIcon: {
    fontSize: 22
  },
  radioLabel: {
    fontSize: 14
  },
  radioLabelNoIcon: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18
  },
  language: {
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: "50%",
    overflow: "hidden"
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 6
  },
  checkboxLabel: {
    fontSize: 20
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "orangered",
    backgroundColor: "transparent",
    padding: 6
  },
  checkboxIndicator: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "orangered"
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 22,
    backgroundColor: "orangered"
  },
  submit: {
    fontSize: 22
  }
});
