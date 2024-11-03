import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddTaskScreen from "../AddTaskScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function Task() {
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
          <Stack.Screen name="Add Task Screen" component={AddTaskScreen} />
          
        </Stack.Navigator>
     
    );
  }