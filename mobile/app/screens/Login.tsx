import { View, Image, Button, StyleSheet, TextInput } from 'react-native';
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
      <Image source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }} style={styles.image} />
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Email' onChangeText={(text) => setEmail(text)} value={email} />
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} />
        <Button onPress={login} title="Sign in" />
        <Button onPress={() => (navigation as any).navigate('Register')} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  form: {
    gap: 10,
    width: '60%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Login;
