import { ThemedIcon } from "@/components/themed/themed-icon";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Colors } from "@/constants/theme";
import { useOpositeColorScheme } from "@/hooks/use-color-schemes";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet } from "react-native";

type FormRadioProps = {
  icon?: keyof typeof FontAwesome6.glyphMap,
  label: string;
  value: string;
  isActive?: boolean;
  onPress: Dispatch<SetStateAction<any>> | (() => void); //! temp (any)
};

export default function FormRadio({
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
};

const styles = StyleSheet.create({
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
  }
});
