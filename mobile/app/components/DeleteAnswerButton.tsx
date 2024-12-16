import axios from "axios";
import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import API_URL_GLOBAL from "../../config";

interface DeleteAnswerButtonProps {
  questionId: number;
  answerId: number;
  onDelete: (questionId: number, answerId: number) => void; // Update this to expect two arguments
}

const DeleteAnswerButton: React.FC<DeleteAnswerButtonProps> = ({
  questionId,
  answerId,
  onDelete,
}) => {
  const handleDelete = async () => {
    Alert.alert(
      "Delete Answer",
      "Are you sure you want to delete this answer?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(
                `${API_URL_GLOBAL}forum-questions/${questionId}/answers/${answerId}/`
              );
              console.log("Answer deleted");
              onDelete(questionId, answerId); // Call onDelete to update the UI
            } catch (error) {
              console.error("Error deleting answer:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <Icon name="delete-outline" color="red" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeleteAnswerButton;
