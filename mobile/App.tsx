import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import { Forum } from "./app/screens/Forum";
import ForumQuestionDetail from "./app/screens/ForumQuestionDetail";
import { Question } from './app/types/forum';
import React from 'react';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Forum: undefined;
  ForumQuestionDetail: { question: Question };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*
        {authState?.authenticated
          ? <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />
            }}></Stack.Screen>
          : <Stack.Screen name='Login' component={Login}></Stack.Screen>}
          */}
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen
          name="ForumQuestionDetail"
          component={ForumQuestionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
