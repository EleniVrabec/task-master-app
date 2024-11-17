import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../ProfileScreen';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabTwoScreen() {
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
          <Stack.Screen name="My profile" component={ProfileScreen}  />
          
        </Stack.Navigator>
     
    );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
