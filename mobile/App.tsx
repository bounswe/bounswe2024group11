import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import CreateQuestion from "./app/screens/CreateQuestion";
import Forum from "./app/screens/Forum";
import ForumQuestionDetail from "./app/screens/ForumQuestionDetail";
import Leaderboard from "./app/screens/Leaderboard";
import Login from "./app/screens/Login";
import Profile from "./app/screens/Profile";
import QuizDetail from "./app/screens/QuizDetail";
import QuizFeed from "./app/screens/QuizFeed";
import Register from "./app/screens/Register"; // import the new Register screen
import ViewQuiz from "./app/screens/ViewQuiz";
import { Question } from "./app/types/forum";
import { QuizOverview } from "./app/types/quiz";

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined; // Use this for the bottom tabs
  Register: undefined;
  Forum: undefined;
  ForumQuestionDetail: { question: Question };
  QuizDetail: { quiz: QuizOverview };
  ViewQuiz: {
    id: string;
    type: number;
    title: string;
    description: string;
  };
  CreateQuestion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

const BottomTabNavigator = () => {
  const { onLogout } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Forum"
        component={Forum}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Button onPress={onLogout} title="Sign Out" />
            </View>
          ),
          tabBarIcon: () => (
            <Image
              source={require("./assets/forum_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QuizFeed"
        component={QuizFeed}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./assets/quiz_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./assets/leaderboard_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={require("./assets/profile_icon.png")}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Layout = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="MainTabs"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Forum" component={Forum} />
            <Stack.Screen name="CreateQuestion" component={CreateQuestion} />
            <Stack.Screen
              name="ForumQuestionDetail"
              component={ForumQuestionDetail}
            />
            <Stack.Screen name="QuizDetail" component={QuizDetail} />
            <Stack.Screen
              name="ViewQuiz"
              component={ViewQuiz}
              options={({ route }) => ({
                title: route.params?.title ? route.params.title : "Quiz",
              })}
            />
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
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
