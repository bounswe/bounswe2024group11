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

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import { useTheme } from "../context/ThemeContext";
import { Divider } from "react-native-paper";

type SignupNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Signup = ({
  navigation,
  toggle,
}: {
  navigation: SignupNavigationProp;
  toggle: Dispatch<SetStateAction<boolean>>;
}) => {
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

  const theme = useTheme();

  return (
    <ScrollView style={styles.authWrapper}>
      <View style={styles.authRoot}>
        <View style={styles.imgDiv}>
          <Image
            source={require("../assets/zenith-logo-login.png")}
            style={styles.logo}
            resizeMethod="scale"
            resizeMode="contain"
          />
          <Text style={styles.h1}> Create a new Zenith account </Text>
          <Text> Unlock the world of comics. </Text>
        </View>

        <Divider style={styles.divider} />

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
        <View style={styles.checkboxContainer}></View>
        <CustomButton
          text="Register"
          onPress={onSignupPress}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[0]}
        />
        <CustomButton
          text="Login"
          onPress={onLoginPress}
          bgColor={theme.colors.neutral[0]}
          textColor={theme.colors.neutral[7]}
        />
      </View>
    </ScrollView>
  );
};

export default Signup;
