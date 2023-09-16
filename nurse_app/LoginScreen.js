import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LoginScreen({ navigation }) {
  const [nurseID, setNurseID] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nurseID, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Alert.alert('Success', data.message);
        } else {
          Alert.alert('Failed', 'Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  
  return (
    <LinearGradient colors={['#7F7FD5', '#86A8E7', '#91EAE4']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./logo.jpg')} style={styles.logo} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nurse ID"
        placeholderTextColor="#fff"
        onChangeText={setNurseID}
        value={nurseID}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#8A2BE2' }]} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderRadius: 25,
    color: '#fff',
  },
  button: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF6347',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default LoginScreen;
