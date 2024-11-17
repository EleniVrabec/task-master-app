import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router'; 
import { BlurView } from 'expo-blur';
import { KeyboardAvoidingView, Platform } from 'react-native';


export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  /* const navigation = useNavigation(); */ // Get the navigation object

  useEffect(() => {
    // Check if the user is already logged in
    // const checkLoginStatus = async () => {
    //   const storedUserData = await AsyncStorage.getItem('userData');
    //   if (storedUserData) {
    //     router.navigate('/'); // Redirect to Home if already logged in
    //   }
    // };

    // checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

      if (parsedUserData && parsedUserData.username === username && parsedUserData.password === password) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        Alert.alert('Login Successful', 'Welcome to Task Master!');
        router.navigate('/'); // Navigate to Home Screen after successful login
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <ImageBackground
    source={require('../assets/images/startbckg.png')}
    style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for different platforms
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Optional, can fine-tune for iOS/Android
    >
    <View style={styles.container}>
    <View style={styles.formContainer}>
      <Text style={styles.header}>Manage your daily tasks</Text>
     
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="rgba(255, 255, 255, 0.8)"

      />
      </BlurView>
      <Button color="#FF6347" title="Login" onPress={handleLogin} />

      {/* Link to SignUpScreen */}
      <TouchableOpacity onPress={() => router.navigate('/SignUpScreen')}>
        <Text style={styles.signUpLink}>Don't have account? Sign up</Text>
      </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom:30
    
  },
  formContainer:{
    
  },
  header: {
    fontSize: 42,
    marginBottom: 30,
    textAlign: 'left',
     color:'white',
     fontWeight:'bold'
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
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
  signUpLink: {
    marginTop: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
