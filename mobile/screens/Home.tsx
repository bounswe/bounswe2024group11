import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../components/BottomTab";
import Auth from "./Auth";
import { DEFAULT_USER, User, useUser } from "../context/UserContext";
import {
  NotSavedError,
  compareToken,
  getUser,
} from "../components/StorageHandler";

const Stack = createStackNavigator();

function Home() {
  const { user, setUser } = useUser();

  useEffect(() => {
    compareToken()
      .then((token) => {
        // console.log(token);
        return token;
        throw new Error("Not implemented home validation");
        // return getUser({ token: token, endpoint: "user/validate" });
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        if (error instanceof NotSavedError) {
        } else {
          console.log(error);
        }
      });
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
