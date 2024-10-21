import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import CreateQuestion from "./app/screens/CreateQuestion";
import Forum from "./app/screens/Forum";
import ForumQuestionDetail from "./app/screens/ForumQuestionDetail";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register"; // import the new Register screen
import { Question } from "./app/types/forum";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Forum: undefined;
  ForumQuestionDetail: { question: Question };
  CreateQuestion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
          }}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="CreateQuestion" component={CreateQuestion} />
        <Stack.Screen
          name="ForumQuestionDetail"
          component={ForumQuestionDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
