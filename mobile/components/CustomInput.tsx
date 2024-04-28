import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Button, Icon } from "react-native-paper";

import { useTheme } from "../context/ThemeContext";

type CustomInputTypes = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  secure: boolean;
  image: string;
};

const CustomInput = (props: CustomInputTypes) => {
  const { value, setValue, placeholder, secure, image } = props;

  const theme = useTheme();

  return (
    <View style={styles.main}>
      <View
        style={[
          styles.container,
          {
            borderColor: theme.colors.neutral[2],
          },
        ]}
      >
        <View style={styles.icon}>
          <Icon source={image} size={20} color={theme.colors.neutral[5]} />
        </View>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secure}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingLeft: 5,
  },
  icon: {
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default CustomInput;
