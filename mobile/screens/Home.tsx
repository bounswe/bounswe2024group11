import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./Login";
import BottomTab from "../components/BottomTab";

const Stack = createStackNavigator();

function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
