import { useThemeColor } from '@/hooks/use-theme-color';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export type ThemedIconProps = any & { //! PROBLEM WITH FONTAWESOME TYPES
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ style, lightColor, darkColor, ...otherProps }: ThemedIconProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <FontAwesome6 style={[{ color }, style]} {...otherProps} />;
}
