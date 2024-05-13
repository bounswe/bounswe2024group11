import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { View, Text, Image, ScrollView } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import { useTheme } from "../context/ThemeContext";
import { ActivityIndicator, Divider } from "react-native-paper";

import { saveToken, post } from "../components/StorageHandler";

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [panic, setPanic] = useState(false);

  const [invalid, setInvalid] = useState(false);

  const onSignupPress = () => {
    setLoading(true);
    post({
      data: {
        fullname: fullname.trim(),
        email: email.trim(),
        username: username.trim(),
        password: password,
      },
      endpoint: "user/signup",
    })
      .then((data) => {
        setSuccess(true);
        setTimeout(() => {
          toggle(true);
          setSuccess(false);
        }, 1500);
      })
      .catch((error) => {
        if (error) {
          setInvalid(true);
        } else {
          setPanic(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setInvalid(false);
    setPanic(false);
  }, [fullname, email, username, password]);

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
        {invalid && (
          <Text style={[styles.error, { color: theme.colors.red[4] }]}>
            {" "}
            Invalid email or existing username or missing fields.
          </Text>
        )}
        {panic && (
          <Text style={[styles.error, { color: theme.colors.red[4] }]}>
            {" "}
            Something went wrong. Please try again.
          </Text>
        )}
        {success && (
          <Text style={[styles.error, { color: theme.colors.green[4] }]}>
            {" "}
            Signup successful. Redirecting to login page.
          </Text>
        )}

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
        <ActivityIndicator
          style={{ marginTop: 24 }}
          animating={loading}
          color={theme.colors.cyan[3]}
          size="large"
        />
      </View>
    </ScrollView>
  );
};

export default Signup;
