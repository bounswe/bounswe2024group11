import axios from "axios";
import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface DeleteButtonProps {
  questionId: number;
  onDelete: (questionId: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  questionId,
  onDelete,
}) => {
  const handleDelete = async () => {
    Alert.alert(
      "Delete Question",
      "Are you sure you want to delete this question?",
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
                `http://138.68.97.90/api/v1/forum-questions/${questionId}/`
              );
              console.log("Question deleted");
              onDelete(questionId);
            } catch (error) {
              console.error("Error deleting question:", error);
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

export default DeleteButton;
