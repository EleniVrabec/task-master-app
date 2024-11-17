import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, View, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddCategory from "@/components/AddCategory";

import { CategoryItem } from "@/models/CategoryItem";
import { TaskItem } from "@/models/TaskItem";
import { router } from "expo-router";
import DeleteAllTasks from '@/components/deleteAllTasks';

export default function ProfileScreen({ navigation }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false); // New modal state
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState<{ username: string, password: string, usermail: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Ionicons name="log-out-outline" size={24} color="#F5F5F5" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      loadCategories();
      loadUserData();
    }
  }, [isFocused]);
console.log("user data " + userData)
  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log("user data " + storedUserData )
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        setUserData(null); 
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    Alert.alert('Logout', 'You have been logged out.');
    router.replace('/LogInScreen'); 
  };

  const confirmDeleteUser = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      Alert.alert('Account Deleted', 'Your account has been deleted.');
      setShowDeleteAccountModal(false);
      router.replace('/SignUpScreen');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleAddCategory = async (newCategory: CategoryItem) => {
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);

    await AsyncStorage.setItem('categorylist', JSON.stringify(updatedCategories));
    
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1500);
  };

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categorylist');
      if (storedCategories !== null) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  async function deleteAllCategories() {
    await AsyncStorage.removeItem('categorylist');
    setCategories([]);
    setShowDelete(false); 

    try {
      
      const storedTasks = await AsyncStorage.getItem('tasklist');
      if (storedTasks) {
        const taskList = JSON.parse(storedTasks);
        const updatedTasks = taskList.map((task: TaskItem) => {
          if (task.category && !categories.some(cat => cat.name === task.category)) {
            task.category = "Uncategorized";
          }
          return task;
        });
        await AsyncStorage.setItem('tasklist', JSON.stringify(updatedTasks));
      
      
      }
    } catch (error) {
      console.error("Failed to update tasks after deleting categories", error);
    }
     
    loadCategories();
    
  }

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.headerContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {userData.username ? userData.username.charAt(0).toUpperCase() : ''}
            </Text>
          </View>
          <Text style={styles.userLabel}>Welcome, {userData.username}!</Text>
          <Text style={styles.userEmail}>{userData.usermail}</Text>
        </View>
      )}
  
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.subHeading}>Your Categories</Text>
          </>
        )}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.categoryList}
        ListFooterComponent={() => (
          <>
            <View style={styles.separator}></View>
            <Text style={styles.subHeading}>Manage your categories</Text>
            <View style={styles.addCategoryContainer}>
              <AddCategory onAddCategory={handleAddCategory} />
            </View>
  
            <View style={styles.separator}></View>
  
            <View style={styles.buttonContainer}>
              <Text style={styles.subHeading}>Delete All Categories</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setShowDelete(true)}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color="#F5F5F5"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <Text style={styles.subHeading}>Delete Your Account</Text>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => setShowDeleteAccountModal(true)}
              >
                <AntDesign
                  name="deleteuser"
                  size={20}
                  color="#F5F5F5"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              {/* Navigation to Privacy Policy */}
      <Text style={styles.subHeading}>Privacy Policy</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('PrivacyPolicy')}
        style={styles.accountButton}
      >
         <Ionicons
    name="information-circle-outline" // Example icon for Privacy Policy
    size={20}
    color="#F5F5F5"
    style={{ marginRight: 8 }}
  />
        <Text style={styles.buttonText}>View Our Privacy Policy</Text>
      </TouchableOpacity>
            </View>
  
            {showDelete && (
              <DeleteAllTasks
                message="Are you sure you want to delete all categories?"
                button1Click={() => setShowDelete(false)}
                button1Text="Cancel"
                button2Click={deleteAllCategories}
                button2text="Confirm"
              />
            )}
  
            {/* Success Modal */}
            <Modal
              transparent={true}
              visible={showSuccessModal}
              animationType="fade"
              onRequestClose={() => setShowSuccessModal(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.successModal}>
                  <Text style={styles.successText}>
                    Category Added Successfully!
                  </Text>
                  <Image
                    source={require('../assets/images/success.gif')}
                    style={styles.successGif}
                  />
                </View>
              </View>
            </Modal>
  
            {/* Delete Account Confirmation Modal */}
            <Modal
              transparent={true}
              visible={showDeleteAccountModal}
              animationType="fade"
              onRequestClose={() => setShowDeleteAccountModal(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.confirmModal}>
                  <Text style={styles.confirmText}>
                    Are you sure you want to delete your account?
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setShowDeleteAccountModal(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={confirmDeleteUser}
                    >
                      <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      />
    </View>
  );
  
}

const styles = StyleSheet.create({
  separator:{
    marginTop:10,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray', // Optional for border effect
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    paddingTop: 40, // To account for devices with status bars
    backgroundColor: 'transparent', // Adjust this to match your theme
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center items vertically
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Optional for border effect
    marginBottom:10
  },
  avatarCircle: {
    width: 100, // Diameter of the circle
    height: 100,
    borderRadius: 50, // Makes the view a circle
    backgroundColor: '#fff', // Background color of the circle, can be customized
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Adds some spacing below the avatar
  },
  avatarText: {
    color: '#FF6347', // Text color, adjust for visibility
    fontSize: 44,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#f0f0f0',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 20,
  },
  successGif: {
    width: 100,
    height: 100,
  },
  headerButton:{
    marginRight:0
  },
  userInfo: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 5,
  },
  userLabel: {
    color: '#FF6347',
    fontWeight: 'semibold',
    fontSize: 24,
  },
  subHeading: {
   
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'semibold',
    marginTop: 20,
    marginBottom: 15,
  },
  addCategoryContainer: {
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginVertical: 5,
  },
  categoryText: {
    color: '#F5F5F5',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',

    marginBottom:20
  },
  deleteButton: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row', // Row layout for icon + text
    alignItems: 'center', // Center align icon and text vertically

    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,
   
  },
  accountButton: {
    backgroundColor: '#1E1E1E',
    flexDirection: 'row', // Row layout for icon + text
    alignItems: 'center', // Center align icon and text vertically

    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 5,

   
  },
  buttonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModal: {
    width: 250,
    padding: 20,
    backgroundColor: '#28a745',
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    color: '#F5F5F5',
    textAlign: 'center',
  },
  confirmModal: {
    width: 300,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 18,
    color: '#F5F5F5',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
});
