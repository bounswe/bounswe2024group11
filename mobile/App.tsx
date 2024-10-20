import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import Forum from "./app/screens/Forum";
import CreateQuestion from "./app/screens/CreateQuestion";
import ForumQuestionDetail from "./app/screens/ForumQuestionDetail";
import { Question } from "./app/types/forum";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
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
