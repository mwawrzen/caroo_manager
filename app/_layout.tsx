import ThemedSafeAreaView from "@/components/themed/themed-safe-area-view";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts
} from "@expo-google-fonts/quicksand";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
import AddCarForm from "@/components/add-car-form";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import useCarStore from "@/store/car-store";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold
  });

  const colorScheme = useColorScheme();

  const { cars, getCurrentCar, setCurrentCar } = useCarStore();
  const currentCar = getCurrentCar();

  //! only dev
  useEffect(() => {
    if (cars.length)
      setCurrentCar(cars[0].id);
  }, []);
  //!

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Set the navigation bar style
      // NavigationBar.setStyle('light');
      // NavigationBar.setVisibilityAsync('visible');
      NavigationBar.setStyle(colorScheme || 'light');
    }
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!currentCar) {
    return (
      <>
      <ThemedSafeAreaView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Header />
          <AddCarForm />
        </ThemeProvider>
      </ThemedSafeAreaView>
      {/* <StatusBar style="dark" hidden={false} /> */}
    </>
    );
  }

  return (
    <>
      <ThemedSafeAreaView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Header />
          <Stack screenOptions={{ headerShown: false }} />
          <Navigation />
        </ThemeProvider>
      </ThemedSafeAreaView>
      {/* <StatusBar style="dark" hidden={false} /> */}
    </>
  );
}
