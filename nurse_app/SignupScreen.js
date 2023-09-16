import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
function SignupScreen({ navigation }) {
  const [nurseName, setNurseName] = useState('');
  const [nurseID, setNurseID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    fetch('http://localhost:8000/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nurse_name: nurseName, nurseID, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          Alert.alert('Success', data.message);
          navigation.navigate('Home', { nurseName: nurseName, nurseID: nurseID });  
          // navigation.navigate('Login');
        } else {
          Alert.alert('Failed', 'Could not register');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <LinearGradient colors={['#FF7E5F', '#FEA195', '#F6D365']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./logo.jpg')} style={styles.logo} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nurse Name"
        placeholderTextColor="#fff"
        onChangeText={setNurseName}
        value={nurseName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nurse ID"
        placeholderTextColor="#fff"
        onChangeText={setNurseID}
        value={nurseID}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: '#32CD32' }]} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignupScreen;
