import React, { Dispatch, SetStateAction, useContext, useState, useEffect } from "react";

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

import { DEFAULT_USER, useUser } from "../context/UserContext";
import { Checkbox, PaperProvider } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";

import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import storage, { compareToken, saveToken, removeToken } from "../components/storageBullshit"

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

  const [remember, setRemember] = useState(false);
  const [secure, setSecure] = useState(true);

  const { user, setUser } = useUser();
  const theme = useTheme();

  const onLoginPress = () => {
    setUser(DEFAULT_USER);
    saveToken({ user: DEFAULT_USER });
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

        <View>
          <Checkbox.Item
            label="Remember me"
            status={remember ? "checked" : "unchecked"}
            onPress={() => setRemember(!remember)}
            rippleColor={theme.colors.cyan[0]}
            color={theme.colors.cyan[2]}
          />
        </View>

        <CustomButton text="Login" onPress={onLoginPress} bgColor="#454545" />
        <CustomButton
          text="Register"
          onPress={onSignupPress}
          bgColor="#20ADD0"
        />
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
    justifyContent: "space-between",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
  },
  imgDiv: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 20,
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
