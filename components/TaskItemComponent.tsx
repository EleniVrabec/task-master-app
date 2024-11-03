import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { TaskItem } from "@/models/TaskItem";
import Ionicons from "react-native-vector-icons/Ionicons";

interface TaskItemComponentProps {
  item: TaskItem;
  onDelete: (id: string) => void; 
}

 const TaskItemComponent = ({ item, onDelete } : TaskItemComponentProps) => {
 

  return (
    <LinearGradient
      /* colors={['#FF7E5F', '#FD3A69']}  */
      colors={['rgba(219, 84, 0, 0.7)', 'rgba(219, 84, 0, 0.2)', 'rgba(13, 13, 13, 0.1)', '#0D0D0D']}
          start={{ x: 0, y: 0. }}  // Starts from the top-left corner
          end={{ x: 0.9, y: 1.9 }} 
           
      style={styles.gradientBackground}
    >
    {/* Delete Icon */}
    <TouchableOpacity style={styles.deleteIcon} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
      </TouchableOpacity>

    <View style={styles.row}>
        <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
        <Text style={styles.heading}>{item.title}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="information-circle-outline" size={20} color="#DDDDDD" />
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {item.category && (
        <View style={styles.row}>
          <Ionicons name="pricetag-outline" size={20} color="#AAAAAA" />
          <Text style={styles.category}>Category: {item.category}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
        <Text style={styles.date}>Due on: {new Date(item.date).toLocaleDateString()}</Text>
      </View>

      {/* Uncomment if endTime is needed
      {item.endTime && (
        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color="#FFFFFF" />
          <Text style={styles.endTime}>End Time: {new Date(item.endTime).toLocaleTimeString()}</Text>
        </View>
      )} */}

      {/* <View style={styles.row}>
      <Ionicons name="alert-circle-outline" size={20} color='#FFFFFF' style={styles.icon} />
        <Text style={styles.status}>Current Status: {item.status}</Text>

      </View> */}
    </LinearGradient>
  );
};

export default TaskItemComponent

const styles = StyleSheet.create({
  gradientBackground: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    /* backgroundColor: 'rgba(255, 0, 0, 0.7)', */
    borderRadius: 20,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
    alignSelf: 'center',  // Ensure icon is vertically centered
  },
  heading: {
    marginLeft:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingVertical: 4,  // Adjusts text baseline alignment
  },
  description: {
    marginLeft:10,
    fontSize: 16,
    color: '#DDDDDD',
    paddingVertical: 4,  // Adjusts text baseline alignment
  },
  category: {
    marginLeft:10,
    fontSize: 14,
   /*  fontStyle: 'italic', */
    color: '#DDDDDD',
    paddingVertical: 4,
  },
  date: {
    marginLeft:10,
    fontSize: 14,
    color: '#DDDDDD',
    paddingVertical: 4,
  },
  status: {
    marginLeft:10,
    fontSize: 14,
    color: '#DDDDDD',
   /*  fontWeight: 'bold', */
    paddingVertical: 4,
  },
});