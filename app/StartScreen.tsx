import AddCategory from "@/components/AddCategory";
import DeleteAllTasks from "@/components/deleteAllTasks";
import TaskItemComponent from "@/components/TaskItemComponent";
import { CategoryItem } from "@/models/CategoryItem";
import { TaskItem } from "@/models/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, StyleSheet, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function StartScreen({ navigation }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [allTaskData, setAllTaskData] = useState<TaskItem[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const [listType, setListType] = useState("To Do");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadData = async () => {
      if (isFocused) {
        await loadCategories();
        await loadTasks();
       
      }
    };
  
    loadData();
  }, [isFocused, listType, selectedCategory]);
  // Trigger showList when allTaskData changes
useEffect(() => {
  if (allTaskData.length > 0) {
    showList(); // Call showList only when there is data to filter
  }
}, [allTaskData]);


  const loadCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categorylist");
      setCategories(storedCategories ? JSON.parse(storedCategories) : []);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasklist");
      const taskData = storedTasks ? JSON.parse(storedTasks) : [];
      // Set the tasks
      setTasks(taskData);
      setAllTaskData(taskData); 
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };
  
  const deleteAll = async () => {
    await AsyncStorage.removeItem("tasklist");
    setTasks([]);
    setAllTaskData([]);
    setFilteredTasks([]);
    setShowDelete(false)
    
  };

  // Filter tasks based on selected status and category
  const showList = () => {
    if (allTaskData.length === 0) {
      console.log("No tasks to filter.");
      return; 
    }   
     const filtered = allTaskData.filter((task) => {
      const matchesStatus = task.status === listType;
      const matchesCategory = selectedCategory === "All Categories" || task.category === selectedCategory;
      return matchesStatus && matchesCategory;
    });
    console.log("Filtered Tasks:", filtered);
    setFilteredTasks(filtered);
  };

  const switchStatus = async (taskId: string, newStatus: TaskItem["status"]) => {
    const updatedTasks = allTaskData.map((task) => {
      if (task.id === taskId) task.status = newStatus;
      return task;
    });
    setAllTaskData(updatedTasks);
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasklist", JSON.stringify(updatedTasks));
    showList();
    closeModal();
  };

  const openModal = (task: TaskItem) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };
  // Delete a specific task
  const handleDeleteTask = async (id: string) => {
    const updatedTasks = allTaskData.filter((task) => task.id !== id);
    setAllTaskData(updatedTasks);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks.filter((task) =>
      (task.status === listType) && (selectedCategory === "All Categories" || task.category === selectedCategory)
    ));
    await AsyncStorage.setItem("tasklist", JSON.stringify(updatedTasks));
    closeModal();
  };

  
  return (
    <View style={styles.container}>  
    {/* Categories List with "All Categories" */}
    <View>
    
   {/*  <Text style={styles.headingH2}>Your Categories</Text> */}
   <View style={styles.categoryContainer}>
      <FlatList
        data={[{ id: "all", name: "All Categories" }, ...categories]}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.name === "All Categories" ? "All Categories" : item.name)}>
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
       /*  contentContainerStyle={styles.flatListContent} */
      />
  </View>
      {/* Status Filters */}
      <Text style={styles.headingH2}>Filter by Status</Text>
     
      <View style={styles.statusFilters}>
        <TouchableOpacity
          style={listType === "To Do" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("To Do")}
        >
          <Text style={styles.statusText}>To Do</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listType === "In Progress" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("In Progress")}
        >
          <Text style={styles.statusText}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={listType === "Done" ? styles.shopFilterTabActive : styles.taskFilterTab}
          onPress={() => setListType("Done")}
        >
          <Text style={styles.statusText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  
    {/* Filtered Tasks List */}
<Text style={styles.headingH2}>Your Tasks</Text>
<FlatList
  data={filteredTasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Pressable style={{ marginLeft:20, marginRight:20 }} onPress={() => openModal(item)}>
      <TaskItemComponent item={item} onDelete={handleDeleteTask} />
    </Pressable>
  )}
  contentContainerStyle={styles.taskList}
  ListFooterComponent={
    filteredTasks.length > 0 ? ( // Only show if there are tasks
      <View style={styles.deleteAllContainer}>
        <TouchableOpacity onPress={() => setShowDelete(true)}>
          <Text style={styles.deleteButtonText}>Delete All Tasks</Text>
        </TouchableOpacity>
      </View>
    ) : null
  }
/>


{/* Floating Add Task Button */}
{/* <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("AddTaskScreen")}>
  <Ionicons name="add" size={32} color="white" />
</TouchableOpacity>
 */}
{showDelete && (
  <DeleteAllTasks   
    message="Are you sure you want to delete all tasks?"
    button1Click={() => setShowDelete(false)}
    button1Text="Cancel"
    button2Click={deleteAll}
    button2text="Confirm"
  />
)}

  
    {/* Modal for updating task status */}
    {selectedTask && (
      <Modal visible={isModalVisible} animationType="slide">
        
        <View style={styles.modalContainer}>
          
          <Text style={styles.modalHeading}>Change Status for {selectedTask.title}</Text>
          
          <Picker
            selectedValue={selectedTask.status}
            onValueChange={(newStatus) => switchStatus(selectedTask.id, newStatus)}
            style={styles.picker}
      itemStyle={styles.pickerItem}
          >
            <Picker.Item label="To Do" value="To Do" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Done" value="Done" />
          </Picker>
           {/* Delete Icon in Modal */}
           
           <View style={styles.buttonModalContainer}> 
            <View style={styles.modalDeleteBtn} >
            <Button color={'white'} title="Delete Task" onPress={() => handleDeleteTask(selectedTask.id)} />
            </View>


          <View style={styles.modalBtn} >
            <Button color={'white'} title="Cancel" onPress={closeModal} />
          </View>
          </View>
        </View>
      </Modal>
    )}
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
  /*   padding:20 */
  },
  gradientBackground: {  
    borderRadius: 10,
  },
  headingH2:{
    color:'white',
    fontSize:20,
    fontWeight:'semibold',
    
   
    paddingBottom:15,
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20
  },
  buttonModalContainer: {
    position:'absolute',
    bottom:60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'transparent', // No background color
    borderWidth: 0, // Remove border
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  
  createButton: {
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    width: 70,
    height: 70,
    backgroundColor: '#FF6347',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 40, 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteAllContainer: {
    alignItems: 'center', // Center the button
    marginVertical: 20,   // Add space from other content
  },
  
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  
  statusFilters: {
    width:'100%',
    flexDirection: "row",
    color:'white',
    borderRadius: 0,
    marginTop:0,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding:5,
    
  },
  statusText:{
     color:'white',
     fontSize:16, 
    
  },
  taskFilterTab: {
       
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    color:'white',
    borderRadius: 5,
    
  },
  shopFilterTabActive: {
    backgroundColor: "#FF6347",
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    borderRadius: 5,
    
  },
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
   /*  borderWidth: 1, */
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, 
    overflow: 'hidden', 
  },
  selectedText: {
    color: '#FF6347', 
  },
  taskList: {
    paddingBottom: 40, 
  },
  modalContainer: { 
    flex:1,
    zIndex:100, 
    width:'100%',
    height:'100%',
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
   /*  padding: 20, */
  },
  modalHeading:{
    marginTop:0,
    fontSize:32,
    color:'white',
    padding:20,
    textAlign:"center"
  

  },
  modalBtn:{
    margin:2,
    width:'48%',
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    borderColor:'#FF6347',
    borderWidth: 1,
  },
  modalDeleteBtn:{
    margin:2,
    width:'48%',
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8,
    borderColor:'red',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: '100%',  
    color: '#FFFFFF', 
    borderRadius: 8,
    padding: 8,
    marginBottom: 100,
  },
  pickerItem: {   
    color: '#FFFFFF', // White color for item text
  }
});
