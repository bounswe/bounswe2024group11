import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from "react-native";

const Login = () => {   
    const {height} = useWindowDimensions();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const onLoginPress = () => {
        console.warn(username);
    }
    const onSignupPress = () => {
        console.warn(password);
    }

    return (
        <ScrollView style= {styles.wrapper}>

        <View style= {styles.root}>
            <View style={styles.imgDiv}>
                <Image source= {require('../assets/Zenith.png')} style = {[styles.logo, {height: height * 0.2}]} resizeMode='contain' />
                <Text style={styles.h1} > Login to your Zenith Account </Text>
                <Text> Ready to continue your comic adventure? </Text>
                <Text> Login now! </Text>
            </View>

            <CustomInput placeholder="Username" value={username} setValue={setUsername} secure={false} image={require('../assets/try.png')}/>

            <CustomInput placeholder="Password" value={password} setValue={setPassword} secure= {true} image={require('../assets/try.png')}/>

            <CustomButton text="Login" onPress={onLoginPress} bgColor= '#454545' />
            <CustomButton text="SignUp" onPress={onSignupPress} bgColor= '#20ADD0' />


            
            
        </View>

        </ScrollView>
    )
};



const styles = StyleSheet.create( {
    wrapper: {
        padding: 20,
        maxWidth: 600,
    },
    root: {
        display: "flex",
        alignItems: "center"

    },
    h1: {
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 16
    },
    imgDiv: {
        //backgroundColor: "red",
        display: 'flex',
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 30
    },    
    logo: {
        width: 200, //yüzde ile yazınca olmuyor, yüzde ile yazarsam rootun içini silmem lazım)
        maxWidth: 400,
        maxHeight: 400,
        marginBottom: 30
    }
})

//image altındaki boş alan silinmiyor.

export default Login;