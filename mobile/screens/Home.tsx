import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import Auth from "./Auth";
import { DEFAULT_USER, User, useUser } from "../context/UserContext";
import { compareToken, loadData } from "../components/Storage";

const Stack = createStackNavigator();

function Home() {
  const { user, setUser } = useUser();

  const stayLoggedIn = async (user: User) => {
    const comparedToken = await compareToken(setUser, user);
    if (comparedToken) {
    }
  }

  const validateUser = async (data: User, name: string) => {
    return data && name == data.username;
  }

  const checkUser = async () => {
    let data = loadData("login", validateUser, 'mobile_test_user');
    if (await data == 'some token') {
      setUser(DEFAULT_USER);
    }
  }

  useEffect(() => {
    checkUser();
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
