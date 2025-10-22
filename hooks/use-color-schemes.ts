import { useColorScheme } from 'react-native';

function useOpositeColorScheme() {
  const scheme = useColorScheme() === 'dark' ? 'light' : 'dark';
  return scheme;
}

export { useColorScheme, useOpositeColorScheme };
