import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";

type DeleteAllTasksProps = {
    message: string;
    button1Click: () => void;
    button1Text: string;
    button2Click: () => void;
    button2text: string;
};

export default function DeleteAllTasks({
    message,
    button1Click,
    button1Text,
    button2Click,
    button2text
}: DeleteAllTasksProps) {
    return (
        <Modal transparent={true} visible={true} animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.confirmModal}>
                    <Text style={styles.confirmText}>{message}</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={button1Click}>
                            <Text style={styles.buttonText}>{button1Text}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={button2Click}>
                            <Text style={styles.buttonText}>{button2text}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    confirmModal: {
        width: 300,
        padding: 20,
        backgroundColor: "#333",
        borderRadius: 10,
        alignItems: "center"
    },
    confirmText: {
        fontSize: 18,
        color: "white",
        marginBottom: 20,
        textAlign: "center"
    },
    modalButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    cancelButton: {
        backgroundColor: "#555",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginRight: 10
    },
    confirmButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginLeft: 10
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    }
});
