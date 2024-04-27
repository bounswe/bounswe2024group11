import React, {Dispatch, SetStateAction, useState} from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageSourcePropType } from "react-native";

type CustomInputTypes = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    placeholder: string;
    secure: boolean;
    image: ImageSourcePropType;
}


const CustomInput = (props: CustomInputTypes) => {   
    const {value, setValue, placeholder, secure,image} = props;


    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Image style= {styles.image} source= {image}/>
                <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}  
                secureTextEntry={secure}
                />
            </View>
        </View>
    )

};


const styles = StyleSheet.create( {
    main: {
        display:"flex",
        alignItems:"center"
    },
    input: {
        marginLeft: 5
    },
    image: {
        color: "gray",
        width: 20,
        height: 20,
    },
    container: {
        display:"flex",
        alignItems: "center",
        flexDirection: "row",
        width: 200,
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 16,
    }
})

export default CustomInput;