import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, View, Alert} from 'react-native';
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
          navigation.navigate('Home', { nurseName: 'John Doe', nurseID: '12345' });
        } else {
          Alert.alert('Failed', 'Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <LinearGradient colors={['#989EF8', '#D0D7FF']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../logo.jpg')} style={styles.logo} />
      </View>
      <Image style={styles.logo} />
      <Text style={styles.header}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} />
        <TextInput style={styles.input} placeholder="Nurse ID" onChangeText={setNurseID} value={nurseID}/>
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password}/>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={login}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
});

export default LoginScreen;
