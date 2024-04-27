import React, { useState } from "react";

import { View } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import Login from "./Login";
import Signup from "./Signup";
import { RootStackParamList } from "../components/Types";

type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Auth = ({ navigation }: { navigation: AuthNavigationProp }) => {
  const [login, setLogin] = useState(true);
  return (
    <View>
      {login ? (
        <Login navigation={navigation} toggle={setLogin} />
      ) : (
        <Signup navigation={navigation} toggle={setLogin} />
      )}
    </View>
  );
};

export default Auth;
