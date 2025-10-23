import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-schemes';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const colorScheme = useColorScheme();

  return (
    <TextInput
      style={[
        { color },
        styles.default,
        style,
      ]}
      placeholderTextColor={ colorScheme === 'dark' ? '#eeeeeeaa' : '#111111aa'}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  }
});
