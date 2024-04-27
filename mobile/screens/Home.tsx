import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import Auth from "./Auth";
import { DEFAULT_USER, User, useUser } from "../context/UserContext";
import { compareToken } from "../components/storageBullshit";

const Stack = createStackNavigator();

function Home() {
  const { user, setUser } = useUser();
  const stayLoggedIn = async (user: User) => {
    const comparedToken = await compareToken(setUser, user);
    if (comparedToken) {
    }
  }
  useEffect(() => {
    stayLoggedIn(DEFAULT_USER);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: "Authentication",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
