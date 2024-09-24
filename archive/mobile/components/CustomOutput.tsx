import React, { Dispatch, SetStateAction, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageSourcePropType,
  } from "react-native";



import { Button, Icon } from "react-native-paper";
import { Divider } from "react-native-paper";
import { useTheme } from "../context/ThemeContext";



type CustomOutputTypes = {
    field_name: string;
    value: string;
    image: string;
  };


const CustomOutput = (props: CustomOutputTypes) => {
    const { field_name, value, image } = props;

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
        <View style={styles.outputdiv}>
            <Text>
                {field_name} : {value}
            </Text>
        </View>
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
      paddingRight: 3
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
    outputdiv: {
        paddingRight: 8,
        width: 200
    }
  });

export default CustomOutput