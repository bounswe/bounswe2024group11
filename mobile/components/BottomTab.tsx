import React from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { StackNavigationProp } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { styles } from "../components/Styles";
import { RootStackParamList } from "../components/Types";

import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const Tab = createMaterialBottomTabNavigator();

function BottomTab({ navigation }: { navigation: HomeNavigationProp }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      labeled={false}
      barStyle={styles.tabBar}
      activeColor="black"
      inactiveColor="gray"
      shifting={true}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={focused ? 28 : 24}
              style={focused ? styles.icon : {}}
            />
          ),
          tabBarColor: "white",
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={color}
              size={focused ? 28 : 24}
              style={focused ? styles.icon : {}}
            />
          ),
          tabBarColor: "white",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={focused ? 28 : 24}
              style={focused ? styles.icon : {}}
            />
          ),
          tabBarColor: "white",
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
