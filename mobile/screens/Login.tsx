import React, { Dispatch, SetStateAction, useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../components/Types";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useUser } from "../context/UserContext";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Login = ({
  navigation,
  toggle,
}: {
  navigation: LoginNavigationProp;
  toggle: Dispatch<SetStateAction<boolean>>;
}) => {
  const { height } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const onLoginPress = () => {
    setUser({ isLogged: true });
    navigation.navigate("Home");
  };
  const onSignupPress = () => {
    toggle(false);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.root}>
        <View style={styles.imgDiv}>
          <Image
            source={require("../assets/zenith-logo.png")}
            style={[styles.logo, { height: height * 0.2 }]}
            resizeMode="contain"
          />
          <Text style={styles.h1}> Login to your Zenith Account </Text>
          <Text> Ready to continue your comic adventure? </Text>
          <Text> Login now! </Text>
        </View>

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
          secure={false}
          image="account"
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secure={true}
          image="lock"
        />

        <CustomButton text="Login" onPress={onLoginPress} bgColor="#454545" />
        <CustomButton text="SignUp" onPress={onSignupPress} bgColor="#20ADD0" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    maxWidth: 600,
  },
  root: {
    display: "flex",
    alignItems: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
  },
  imgDiv: {
    //backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  logo: {
    width: 200, //yüzde ile yazınca olmuyor, yüzde ile yazarsam rootun içini silmem lazım)
    maxWidth: 400,
    maxHeight: 400,
    marginBottom: 30,
  },
});

//image altındaki boş alan silinmiyor.

export default Login;
