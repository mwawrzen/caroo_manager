import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  },
  defaultSemiBold: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    color: '#0a7ea4',
  },
});
