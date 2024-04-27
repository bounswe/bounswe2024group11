import React, { Dispatch, SetStateAction, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import UserProvider from "../context/UserContext";

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../components/Types";

type SignupNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Signup = ({
  navigation,
  toggle,
}: {
  navigation: SignupNavigationProp;
  toggle: Dispatch<SetStateAction<boolean>>;
}) => {
  const { height } = useWindowDimensions();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSignupPress = () => {
    toggle(true);
  };
  const onLoginPress = () => {
    toggle(true);
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
          <Text style={styles.h1}> Create a new Zenith account </Text>
          <Text> Unlock the world of comics. </Text>
          <Text> Register for Zenith today. </Text>
        </View>

        <CustomInput
          placeholder="Full Name"
          value={fullname}
          setValue={setFullname}
          secure={false}
          image="account"
        />

        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          secure={false}
          image="email"
        />

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

        <CustomButton text="SignUp" onPress={onSignupPress} bgColor="#454545" />
        <CustomButton text="Login" onPress={onLoginPress} bgColor="#20ADD0" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    maxWidth: 400,
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
    // backgroundColor: "red",
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

export default Signup;
