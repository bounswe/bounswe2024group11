import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

type CustomButtonTypes = {
    text: string;
    onPress: () => void;
    bgColor: string;
}

const CustomButton = (props: CustomButtonTypes) => {   
    const {text, onPress, bgColor} = props;

    return (
        <Pressable onPress = {onPress} 
        style={[
            styles.container, 
            {backgroundColor: bgColor}
        ]}>
            <Text style = {styles.text}>
                {text}
            </Text>
        </Pressable>
    )

};


const styles = StyleSheet.create( {
    text: {
        color: "white",
        fontWeight: "bold"
    },
    text_SECONDARY: {
        color: "gray"
    },
    container: {
        width: '90%',
        borderRadius: 8,
        alignItems: "center",
        padding: 10,
        margin: 10
    },
    container_PRIMARY: {
        backgroundColor: '#454545',
    },
    container_SECONDARY: {
        backgroundColor: '#20ADD0'
    }

})

export default CustomButton;