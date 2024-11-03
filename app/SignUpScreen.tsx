import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; 
import { BlurView } from 'expo-blur';

export default function SignUpScreen({ navigation }: any) {
  const [usermail, setUserEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  /* const [isLogged, setIsLogged] = useState(false); */
  /* const navigation = useNavigation(); */ // Get the navigation object

  const handleSignUp = async () => {
    if (username.trim() && password.trim() && usermail.trim()) {
      try {
        // Save username and password to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify({ username, password, usermail }));
        await AsyncStorage.setItem('isLoggedIn', 'true');
       
        Alert.alert('Sign Up Successful', 'You can now log in.');
        router.navigate('/LogInScreen'); // Navigate back to login page
      } catch (error) {
        console.error('Error saving data:', error);
      }
    } else {
      Alert.alert('Error', 'Please enter a valid username and password.');
    }
  };
  
  return (
    <ImageBackground
    source={require('../assets/images/startbckg.png')}
    style={styles.backgroundImage}
    >
    <View style={styles.container}>
      
      <View style={styles.formContainer}>
      <Text style={styles.title}>Sign Up</Text>
      <BlurView intensity={100} tint="dark" style={styles.glassInput}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="rgba(255, 255, 255, 0.8)"

      />
        </BlurView>
      <BlurView intensity={100} tint="dark" style={styles.glassInput}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={usermail}
        onChangeText={setUserEmail}
        placeholderTextColor="rgba(255, 255, 255, 0.8)"

      />
      </BlurView>
      <BlurView intensity={100} tint="dark" style={styles.glassInput}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="rgba(255, 255, 255, 0.8)"

      />
      </BlurView>
      <Button color="#FF6347" title="Sign Up" onPress={handleSignUp} />
    </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom:50
  },
  formContainer:{
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  glassInput: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'transparent', 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    
  },
  input: {
    padding: 15, 
    fontSize: 16,
    color: 'white',
    backgroundColor: 'transparent',
   
  },
});
