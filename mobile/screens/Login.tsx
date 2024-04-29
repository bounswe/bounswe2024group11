import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Divider,
  PaperProvider,
} from "react-native-paper";

import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../components/Types";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { styles } from "../components/Styles";

import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

import {
  saveToken,
  postUser,
  InvalidCredentialsError,
} from "../components/StorageHandler";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, "Auth">;

const Login = ({
  navigation,
  toggle,
}: {
  navigation: LoginNavigationProp;
  toggle: Dispatch<SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const [loading, setLoading] = useState(false);
  const [panic, setPanic] = useState(false);

  const { user, setUser } = useUser();
  const theme = useTheme();

  const onLoginPress = () => {
    setLoading(true);
    setInvalid(false);
    setPanic(false);
    postUser({
      body: { username: username, password: password },
      endpoint: "user/login",
    })
      .then((data) => {
        if (remember) {
          saveToken({ token: data.token });
        }
        setUser(data.user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error instanceof InvalidCredentialsError) {
          setInvalid(true);
        } else {
          setPanic(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSignupPress = () => {
    toggle(false);
  };

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
          <Text style={styles.h1}> Login to your Zenith Account </Text>
          <Text> Ready to continue your comic adventure? </Text>
        </View>

        <Divider style={styles.divider} />

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

        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="Remember me"
            labelStyle={{ fontSize: 14, color: theme.colors.neutral[7] }}
            status={remember ? "checked" : "unchecked"}
            onPress={() => setRemember(!remember)}
            style={styles.checkbox}
            rippleColor={theme.colors.cyan[0]}
            color={theme.colors.cyan[2]}
          />
          <Button
            mode="text"
            onPress={() => console.log("Forgot Password")}
            rippleColor={"rgba(255, 255, 255, 0.32)"}
            labelStyle={{
              fontFamily: "sans-serif",
              fontSize: 12,
              color: theme.colors.neutral[7],
            }}
          >
            Forgot Password?
          </Button>
        </View>

        {invalid && (
          <Text style={[styles.error, { color: theme.colors.red[4] }]}>
            Invalid username or password
          </Text>
        )}
        {panic && (
          <Text style={[styles.error, { color: theme.colors.red[4] }]}>
            Something went wrong
          </Text>
        )}

        <CustomButton
          text="Login"
          onPress={onLoginPress}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[0]}
        />
        <CustomButton
          text="Register"
          onPress={onSignupPress}
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

export default Login;
