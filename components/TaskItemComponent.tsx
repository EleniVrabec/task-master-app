import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TaskItem } from "@/models/TaskItem";

interface TaskItemComponentProps {
  item: TaskItem;
  onDelete: (id: string) => void; 
}

const TaskItemComponent = ({ item, onDelete } : TaskItemComponentProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => onDelete(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.iconBackground}>
          <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.heading}>{item.title}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.iconBackground}>
          <Ionicons name="information-circle-outline" size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {item.category && (
        <View style={styles.row}>
          <View style={styles.iconBackground}>
            <Ionicons name="pricetag-outline" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.category}>Category: {item.category}</Text>
        </View>
      )}

      <View style={styles.row}>
        <View style={styles.iconBackground}>
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
        </View>
        <Text style={styles.date}>Due on: {new Date(item.date).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

export default TaskItemComponent;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#1E1E1E', // Solid background color for card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderColor: 'rgba(255, 99, 71, 0.5)', // Optional border for accent color
    borderWidth: 1,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
   /*  backgroundColor: '#FF6347', */
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBackground: {
   /*  backgroundColor: '#FF6347', */
    padding: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: '#DDDDDD',
    flexShrink: 1,
  },
  category: {
    fontSize: 14,
    color: '#DDDDDD',
  },
  date: {
    fontSize: 14,
    color: '#DDDDDD',
  },
});
