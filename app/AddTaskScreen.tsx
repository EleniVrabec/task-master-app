import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, Platform, StyleSheet, Modal, Image, ScrollView, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskItem } from '@/models/TaskItem';
import { Picker } from '@react-native-picker/picker';
import { CategoryItem } from '@/models/CategoryItem';
import { useIsFocused } from "@react-navigation/native";
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTaskScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'To Do' | 'In Progress' | 'Done'>('To Do');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [date, setDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const isFocused = useIsFocused();

  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    
  ]);
   // Use useEffect to fetch categories when the component mounts
   useEffect(() => {
    getCategoriesFromAsyncStorage();
  }, [isFocused, categories]);


  useEffect(() => {
    if (isFocused) {
      loadCategories();
    }
  }, [isFocused, categories]);
  useEffect(() => {
    // Reset category if categories array becomes empty
    if (categories.length === 0) {
      setCategory('');
    }
  }, [categories]);

  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categorylist');
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        setCategories([]); // Clear the state if no categories are found
      }
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  // Function to retrieve categories from AsyncStorage
  const getCategoriesFromAsyncStorage = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem('categorylist');
      if (storedCategories !== null) {
        // Parse the categories if they are stored as a stringified array
        const parsedCategories = JSON.parse(storedCategories);
        // Assuming parsedCategories is an array of categories like [{label: 'Category1', value: 'category1'}, ...]
        setItems(parsedCategories);
      }
    } catch (error) {
      console.error('Failed to load categories from AsyncStorage:', error);
    }
  };

  const handleSaveTask = async () => {
    const newTask = new TaskItem(
      Date.now().toString(),
      title,
      description,
      status,
      category,
      date,
      endTime
    );

    try {
      const storedTasks = await AsyncStorage.getItem('tasklist');
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...currentTasks, newTask];
      console.log(updatedTasks);
      await AsyncStorage.setItem('tasklist', JSON.stringify(updatedTasks));
      setTitle('');
      setDescription('');
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        router.replace('/');
      }, 1500);
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

const today = new Date();
today.setHours(0, 0, 0, 0);


  return (
    <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
      <View style={styles.categoryContainer}>

     <FlatList
        data={[{ id: "all", name: "All Categories" }, ...categories]}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            const selectedCat = item.name === "All Categories" ? "All Categories" : item.name;
            setSelectedCategory(selectedCat);
            if (selectedCat !== "All Categories") {
              setCategory(selectedCat); // Set the category to be used when saving the task
            }
          }}>
          {selectedCategory === item.name ? (
           
              <Text style={[styles.selectedCategory, styles.selectedText]}>
                {item.name}
              </Text>

          ) : (
            <Text style={styles.categoryItem}>
              {item.name}
            </Text>
          )}
        </TouchableOpacity>
        
        )}
     
      />
       </View>
       <KeyboardAvoidingView>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#0D0D0D' }}>
      <View style={{ flex: 1, padding: 20, backgroundColor: '#0D0D0D' }}>
        <Text style={{ fontSize: 20, color: '#F5F5F5', textAlign: 'left', marginBottom: 15 }}>
          Write your task
        </Text>

        <TextInput
          placeholder="Title"
          placeholderTextColor="lightgray"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="Description"
          placeholderTextColor="lightgray"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

<View>

</View>
        <View style={{ marginBottom: 15, marginTop: 25 }}>
        <Text style={{ fontSize: 20, color: '#F5F5F5',  fontWeight: 'semibold', textAlign: 'left', marginBottom: 0 }}>
          Choose a date 
        </Text>
          <DateTimePicker
            themeVariant="dark"
            accentColor="#FF6347"
            value={date}
            mode="date"
            display="inline"
            onChange={onDateChange}
            minimumDate={today}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Save Task" onPress={handleSaveTask} color="#FF6347" />
        </View>

        {/* Success Modal */}
        <Modal
          transparent={true}
          visible={showSuccessModal}
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.successModal}>
              <Text style={styles.successText}>Task Added Successfully!</Text>
              <Image
                source={require('../assets/images/success.gif')}
                style={styles.successGif}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Adjust color to your preference
    paddingVertical: 0, // Add some vertical padding for spacing
    marginBottom: 10, // Add margin to separate from other elements
    marginTop: 20
  },
  categoryItem: {
    color:'white',
    fontWeight:'semibold',
    fontSize:18,
    padding: 15,
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
    overflow: 'hidden', 
  },
  selectedCategory: {
    fontWeight:'bold',
    fontSize:18,
    padding: 15,
    margin: 4, 
    borderRadius: 8,
    /* borderWidth: 1, */
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
    overflow: 'hidden', 
  },
  selectedText: {
   /*  color: '#DB5400',  */
   color:"#FF6347"
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  pickerItem: {
    color: 'white',
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
    color: 'white',
    textAlign: 'center',
  },
  successGif: {
    width: 100,
    height: 100,
  },
});
