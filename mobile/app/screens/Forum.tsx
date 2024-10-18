import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../App';
import axios from "axios";
import { Question } from "../types/forum";
import ForumQuestionCard from "../components/ForumQuestionCard";

const API_URL = "http://10.0.2.2:3000/forum-feed";

export const Forum: React.FC = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get(`${API_URL}`);
        // console.log(result.data.questions);
        setQuestions(result.data.questions);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ForumQuestionDetail', { question: item })}>
            <ForumQuestionCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
