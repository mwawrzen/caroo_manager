import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import FormCheckbox from "@/components/ui/form/form-checkbox";
import FormDateInput from "@/components/ui/form/form-date-input";
import FormInput from "@/components/ui/form/form-input";
import FormRadio from "@/components/ui/form/form-radio";
import FormRadioGroup from "@/components/ui/form/form-radio-group";
import FormRadioLang from "@/components/ui/form/form-radio-lang";
import FormSubmit from "@/components/ui/form/form-submit";
import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

Form.Input = FormInput;
Form.DateInput = FormDateInput;
Form.RadioGroup = FormRadioGroup;
Form.Radio = FormRadio;
Form.RadioLang = FormRadioLang;
Form.Checkbox = FormCheckbox;
Form.Submit = FormSubmit;

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
      <ScrollView showsVerticalScrollIndicator={false}>
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
  }
});
