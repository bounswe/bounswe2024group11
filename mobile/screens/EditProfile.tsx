import React, { useState } from "react";

import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

import { NavigationProp, RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../components/Types";
import ProfileHeader from "../components/ProfileHeader";
import { useUser } from "../context/UserContext";
import { styles } from "../components/Styles";
import { useTheme } from "../context/ThemeContext";

import ProfileInfo from "../components/ProfileInfo";
import CustomOutput from "../components/CustomOutput";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

type EditProfileNavigationProp = NavigationProp<
  RootStackParamList,
  "EditProfile"
>;
type EditProfileScreenRouteProp = RouteProp<RootStackParamList, "EditProfile">;

type Props = {
  route: EditProfileScreenRouteProp;
  navigation: EditProfileNavigationProp;
};

function EditProfile({ route, navigation }: Props) {
  const { authorImg, authorBio, authorFullName } = route.params;
  const { user } = useUser();
  const theme = useTheme();

  const [authorImgU, setAuthorImg] = useState(authorImg);
  const [authorFullNameU, setAuthorFullName] = useState(authorFullName);
  const [authorBioU, setBio] = useState(authorBio);
  const onSavePress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          flexDirection: "column",
          padding: 24,
        },
      ]}
    >
      <View>
        <CustomInput
          placeholder="Change your fullname..."
          value={authorFullNameU}
          setValue={setAuthorFullName}
          secure={false}
          image="camera"
        />
      </View>

      <View style={{ height: 200 }}>
        <CustomInput
          placeholder="Change bio..."
          value={authorBioU}
          setValue={setBio}
          secure={false}
          image="head"
          multiline={true}
        />
      </View>
      <View>
        <CustomInput
          placeholder="Change profile picture..."
          value={authorImgU}
          setValue={setAuthorImg}
          secure={false}
          image="camera"
        />
      </View>

      <View>
        <CustomButton
          text="Save"
          onPress={onSavePress}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[2]}
        />
      </View>
    </ScrollView>
  );
}

export default EditProfile;
