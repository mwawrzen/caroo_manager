import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-schemes";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

export default function ThemedSafeAreaView({ ...props }: SafeAreaViewProps) {

   const colorScheme = useColorScheme()
   const backgroundColor = Colors[colorScheme || 'light']['background'];

  return <SafeAreaView style={{ flex: 1, backgroundColor }} {...props} />;
};
