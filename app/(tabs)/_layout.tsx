import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import StartScreen from '../StartScreen';
import AddTaskScreen from '../AddTaskScreen';
import ProfileScreen from '../ProfileScreen';
import MyTheme from '@/assets/styles/theme';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MyTheme.colors.primary,  // Use custom theme color for active tab
        tabBarInactiveTintColor: MyTheme.colors.border, // Use custom theme color for inactive tab
        /* tabBarBackground: () => <View style={{ backgroundColor: MyTheme.colors.card, flex: 1 }} />, */
        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
          colors={['rgba(219, 84, 0, 0.7)', 'rgba(219, 84, 0, 0.2)', 'rgba(13, 13, 13, 0.1)', '#0D0D0D']}
          start={{ x: 1, y: 1 }}  // Starts from the top-left corner
          end={{ x: 0.8, y: 0 }}   // Gradient end point
            style={{ flex: 1 }}
          />
        ),
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: 'Add Task',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="myprofile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />


      
    </Tabs>
  );
}
