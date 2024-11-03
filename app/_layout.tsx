import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import MyTheme from '@/assets/styles/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [appInitialized, setAppInitialized] = useState(false); // Track app initialization
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Hide the splash screen with a delay after fonts and login status are loaded
  useEffect(() => {
    if (appInitialized && loaded) {
      const hideSplash = async () => {
        // Delay the hiding of the splash screen
        await new Promise(resolve => setTimeout(resolve, 3500)); 
        await SplashScreen.hideAsync();
      };
      hideSplash();
    }
  }, [appInitialized, loaded]);




  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Get the login state from AsyncStorage
      const isLogged = await AsyncStorage.getItem('isLoggedIn');
      if (isLogged === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
      setAppInitialized(true); 
      await SplashScreen.hideAsync(); // Hide the splash screen after the check
    }
  };

  // Perform navigation only after the app is initialized
  useEffect(() => {
    if (appInitialized) {
      if (isLoggedIn) {
        router.replace('/'); // Navigate to the main screen
      } else {
        router.replace('/LogInScreen'); // Navigate to the login screen
      }
    }
  }, [appInitialized, isLoggedIn]);

  if (isLoading) {
    // Show a loading indicator while checking the login state
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={MyTheme}>
       <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="LogInScreen" />
        <Stack.Screen name="SignUpScreen" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
