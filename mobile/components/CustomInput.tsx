import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Button, Icon } from "react-native-paper";

type CustomInputTypes = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  secure: boolean;
  image: string;
};

const CustomInput = (props: CustomInputTypes) => {
  const { value, setValue, placeholder, secure, image } = props;

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon source={image} size={20} />
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
    display: "flex",
    alignItems: "center",
  },
  input: {
    paddingLeft: 5,
  },
  icon: {
    paddingLeft: 5,
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: 200,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default CustomInput;
