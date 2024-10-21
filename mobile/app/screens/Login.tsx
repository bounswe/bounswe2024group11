import { View, Image, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();
  const navigation = useNavigation();

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/turquiz_logomark.png")} style={styles.image} />

      <View style={styles.form}>
        <Text style={styles.title}>Login to your Turquiz account</Text>
        <Text style={styles.subtitle}>Ready to continue your language adventure? Login now!</Text>

        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TouchableOpacity onPress={login} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => (navigation as any).navigate('Register')} style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create Account</Text>
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
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccountButton: {
    paddingVertical: 10,
  },
  createAccountText: {
    color: '#4db5ff',
    fontSize: 16,
  },
});

export default Login;
