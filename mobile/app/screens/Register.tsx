import { View, Image, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState(''); 
  const { onRegister } = useAuth();
  const navigation = useNavigation();

  const register = async (navigation : any) => {
    
      const result = await onRegister!(username, fullname, email, password);
      
      if (result && result.error) {
        alert(result.message);
      } else {
        navigation.navigate('Home');
      }
    
  };
   

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/turquiz_logomark.png")} style={styles.image} />
      <View style={styles.form}>
      <Text style={styles.title}>Create Your Account</Text>
      <Text style={styles.subtitle}>Join us and start your adventure!</Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder='Fullname'
          onChangeText={(text) => setFullname(text)}
          value={fullname}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity onPress={register} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => (navigation as any).navigate('Login')} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 44,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f2f2f2',
  },
  registerButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    paddingVertical: 10,
  },
  loginButtonText: {
    color: '#4db5ff',
    fontSize: 16,
  },
});

export default Register;
