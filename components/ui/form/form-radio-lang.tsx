import { LangEnum } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet } from "react-native";
import { De, Pl, Us } from "react-native-svg-circle-country-flags";

type FormRadioLangProps = {
  value: string;
  isActive?: boolean;
  onPress: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

export default function FormRadioLang({
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
    <Pressable
      style={[ styles.language, activeStyles ]}
      onPress={() => onPress(value)}
    >
      {flag}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  language: {
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: "50%",
    overflow: "hidden"
  }
});
