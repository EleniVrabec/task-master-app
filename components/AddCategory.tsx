import { TaskItem } from "@/models/TaskItem";
import { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import { CategoryItem } from "@/models/CategoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CategoryProps = {
    onAddCategory: (category: CategoryItem) => void;
}
export default function AddCategory({onAddCategory} : CategoryProps){
    const [newCategory, setNewCategory] = useState('')
    
    async function handleAddCategory(){
        if (newCategory.trim()) { 
            const addCategory = new CategoryItem(newCategory.trim());
            onAddCategory(addCategory);
            console.log(addCategory); 
            setNewCategory("");
        }
        
    }

   
    
    return(

        <View>

            <TextInput 
            placeholder="Enter Category"
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.input}
            placeholderTextColor={'white'}
            
            />

        <Button title="Add Category" onPress={handleAddCategory} />

        </View>




    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0D0D0D',
      padding: 20,
    },
    input:{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: 15, 
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    addCategoryContainer: {
      marginBottom: 20,
      backgroundColor:'white'
    },

    headerButton: {
      marginRight: 15,
    },

    categoryText: {
      color: 'white',
      fontSize: 16,
      paddingVertical: 5,
    },

    userInfo: {
      marginVertical: 20,
      padding: 10,
     /*  backgroundColor: '#1C1C1C', */
      borderRadius: 5,
    },

    userLabel: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize:34
    },

    userText: {
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 10,
    },
  });