import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../StartScreen';
import AddTaskScreen from '../AddTaskScreen';
import ProfileScreen from '../ProfileScreen';
import LogInScreen from '../LogInScreen';
import SignUpScreen from '../SignUpScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabLayout from './_layout';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const Stack = createNativeStackNavigator();

  return (
    
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: '#f0f0f0' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { color: '#FFFFFF' },
        headerBackground: () => (
          <LinearGradient
          colors={['rgba(219, 84, 0, 0.7)', 'rgba(219, 84, 0, 0.2)', 'rgba(13, 13, 13, 0.1)', '#0D0D0D']}
          start={{ x: 0, y: 0.1 }}  // Starts from the top-left corner
          end={{ x: 0.2, y: 1.5 }} 
            style={{ flex: 1,  }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={StartScreen}
      />
    </Stack.Navigator>
   
  );
}

const styles = StyleSheet.create({
  navigatorStyle:{
    color:'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    color:'white'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
