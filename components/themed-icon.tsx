import { useThemeColor } from '@/hooks/use-theme-color';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type ThemedIconProps = any & { //! PROBLEM WITH FONTAWESOME TYPES
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({ style, lightColor, darkColor, ...otherProps }: ThemedIconProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <FontAwesome style={[{ color }, style]} {...otherProps} />;
}
