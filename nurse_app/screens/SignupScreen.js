import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
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
          // Alert.alert('Success', data.message);
          navigation.navigate('IntroVideo');
          // navigation.navigate('Home', { nurseName: nurseName, nurseID: nurseID });  
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
    <LinearGradient colors={['#989EF8', '#D0D7FF']} style={styles.container}>
      {/* <Image style={styles.logo} /> */}
      <View style={styles.logoContainer}>
        <Image source={require('../logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.header}>Create Your Account</Text>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../name.jpeg')}/>
        <TextInput style={styles.input} placeholder="Name"  onChangeText={setNurseName}
        value={nurseName}/>
      </View>
      <View style={styles.inputContainer}>
      <Image style={styles.icon} source={require('../id.png')}/>
      <TextInput
        style={styles.input}
        placeholder="Nurse ID"
        onChangeText={setNurseID}
        value={nurseID}
      />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../ph.png')}/>
        <TextInput style={styles.input} placeholder="Phone (Optional)" onChangeText={setEmail}
        value={email}/>
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../email.png')}/>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={setEmail}
        value={email}/>
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../password.png')}/>
        <TextInput style={styles.input} placeholder="Password"  onChangeText={setPassword}
        value={password} secureTextEntry />
      </View>
      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText} >Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
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
    fontFamily: 'Helvetica',
    fontSize: 27,
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 20,
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

export default SignupScreen;
