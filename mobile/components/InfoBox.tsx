import React from "react";
import { View, Text } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { Divider } from "react-native-paper";

const InfoBox = (props: { key: number; info: { [key: string]: string } }) => {
  const { info } = props;
  const theme = useTheme();
  return (
    <View style={styles.infoBoxContainer}>
      <Text
        style={[
          styles.infoBoxTitle,
          {
            color: theme.colors.cyan[4],
          },
        ]}
      >
        {info.label}
      </Text>
      <Divider />
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[5],
          },
        ]}
      >
        {info.description}
      </Text>
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[9],
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>Place: </Text>
        {info.place}
      </Text>
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[9],
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>Site Links: </Text>
        {info.siteLinks}
      </Text>
    </View>
  );
};

export default InfoBox;
