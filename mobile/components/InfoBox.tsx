import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { Divider } from "react-native-paper";
import { get } from "./StorageHandler";

const InfoBox = (props: { qid: string; }) => {
  const { qid } = props;
  const theme = useTheme();
  const [info, setInfo] = useState({
    label: "",
    description: "",
    place: "",
    siteLinks: "",
  });

  useEffect(() => {
    get({
      endpoint: `tags/${qid}`,
      data: {qid: qid},
    }).then((response) => {
      setInfo({
        label: response.label,
        description: response.description,
        place: response.place,
        siteLinks: response.siteLinks,
      });
    });
  });

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
