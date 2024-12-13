import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

interface EditButtonProps {
  questionId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ questionId }) => {
  const navigation = useNavigation();
  const handleEdit = () => {
    (navigation as any).navigate("EditQuestion", { questionId }); // not a good solution
  };

  return (
    <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
      <Icon name="pencil-outline" color="#5BADCE" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditButton;
