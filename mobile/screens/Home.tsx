import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Feed from "./Feed";
import Search from "./Search";
import Profile from "./Profile";
import { styles } from "../components/Styles";


const Tab = createMaterialBottomTabNavigator();

function Home() {
    return (
        <BottomTab />
    );
}

function BottomTab() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Feed"
                labeled={false}
                barStyle={ styles.tabBar }
                activeColor="black"
                inactiveColor="gray"
                shifting={true}
            >
                <Tab.Screen name="Feed"
                            component={Feed}
                            options={{
                                    tabBarIcon: ({ color, focused }) => (
                                        <MaterialCommunityIcons 
                                            name="home" 
                                            color={color} 
                                            size={focused ? 28 : 24} 
                                            style={focused ? styles.icon : {}} />
                                    ),
                                    tabBarColor: "white",
                                }}>
                </Tab.Screen>
                <Tab.Screen name="Search" 
                            component={Search}
                            options={{
                                    tabBarIcon: ({ color, focused }) => (
                                        <MaterialCommunityIcons 
                                            name="magnify" 
                                            color={color} 
                                            size={focused ? 28 : 24} 
                                            style={focused ? styles.icon : {}}/>
                                    ),
                                    tabBarColor: "white",
                            }} />
                <Tab.Screen name="Profile" 
                            component={Profile}
                            options={{
                                    tabBarIcon: ({ color, focused }) => (
                                        <MaterialCommunityIcons 
                                            name="account" 
                                            color={color} 
                                            size={focused ? 28 : 24} 
                                            style={focused ? styles.icon : {}}/>
                                    ),
                                    tabBarColor: "white",
                            }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Home;