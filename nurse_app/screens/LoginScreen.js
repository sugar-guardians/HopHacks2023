import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LoginScreen({ navigation }) {
  const [nurseID, setNurseID] = useState('');
  const [password, setPassword] = useState('');

  const fadeAnim = useState(new Animated.Value(0))[0];  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

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
          // Alert.alert('Success', data.message);
          navigation.navigate('IntroVideo');
          // navigation.navigate('Home', { nurseName: 'John Doe', nurseID: '12345' });
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
      {/* <Image style={styles.logo}/> */}
      <View style={styles.logoContainer}>
        <Image source={require('../logo.jpg')} style={styles.logo} />
      </View>
      <Text style={styles.header}>Login</Text>
      
      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <Image style={styles.icon} source={require('../email.png')}/>
        <TextInput style={styles.input} placeholder="Nurse ID" onChangeText={setNurseID}
        value={nurseID} />
      </Animated.View>
      <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
        <Image style={styles.icon} source={require('../password.png')}/>
        <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword}
        value={password} secureTextEntry />
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
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
    borderRadius: 20,  // Increased borderRadius to make the inputs more rounded
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  icon: {
    height: 20,  // Specify a height for your icons
    width: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
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
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  linkText: {
    color: '#e3d',
    textAlign: 'center',
    marginVertical: 15,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
});

export default LoginScreen;
