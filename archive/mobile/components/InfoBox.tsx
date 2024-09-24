import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { Divider } from "react-native-paper";
import { get } from "./StorageHandler";

const InfoBox = (props: { qid: string }) => {
  const { qid } = props;
  const theme = useTheme();
  const [info, setInfo] = useState({
    inception: "",
    gender: "",
    birth_name: "",
    place_of_birth: "",
    image_src: "",
    description: "",
    label: "",
  });

  useEffect(() => {
    get({
      endpoint: `info/`,
      data: { qid: qid },
    })
      .then((response) => {
        var results = response.results[0];
        setInfo({
          inception: results["Inception"],
          gender: results["Gender"],
          birth_name: results["Birth Name"],
          place_of_birth: results["Place of Birth"],
          image_src: results["Image"],
          description: results["Description"],
          label: results["Label"],
        });
      })
      .catch((error) => {
        console.log(error);
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
        <Text style={{ fontWeight: "bold" }}>Birth Name: </Text>
        {info.birth_name}
      </Text>
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[9],
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>Place of Birth: </Text>
        {info.place_of_birth}
      </Text>
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[9],
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>Gender: </Text>
        {info.gender}
      </Text>
      <Text
        style={[
          styles.infoBoxText,
          {
            color: theme.colors.neutral[9],
          },
        ]}
      >
        <Text style={{ fontWeight: "bold" }}>Inception: </Text>
        {info.inception}
      </Text>
      <Divider />
      {info.image_src === "" ? null : (
        <Image style={styles.infoBoxImage} source={{ uri: info.image_src }} />
      )}
    </View>
  );
};

export default InfoBox;
