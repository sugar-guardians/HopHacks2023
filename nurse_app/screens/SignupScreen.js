import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';


function SignupScreen({ navigation }) {
  const [nurseName, setNurseName] = useState('');
  const [nurseID, setNurseID] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    fetch('https://hophacks2023-w74ytc52eq-uc.a.run.app/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nurse_name: nurseName, nurseID, phone, email, password }),
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
      <Text style={styles.header}>SugarGuardians</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Phone (Optional)"
          onChangeText={setPhone}
          value={phone}
          inputMode="tel"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../email.png')}/>
        <TextInput
          style={styles.input}
          placeholder="Email"
          inputMode="email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image style={styles.icon} source={require('../password.png')}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={signup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login!
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  header: {
    fontSize: 44,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    paddingBottom: 30,
    color: '#000',
  },
  icon: {
    height: 25,  // Specify a height for your icons
    width: 25,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#CDC8C8',
  },
  input: {
    height: 50,
    width: 150,
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#5116FB',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    color: '#e3d',
    textAlign: 'center',
    marginTop: 24,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
});

export default SignupScreen;

// import React, { useState } from 'react';
// import {
//   View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Platform, Animated
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';


// function LoginScreen({ navigation }) {
//   const [nurseID, setNurseID] = useState('');
//   const [password, setPassword] = useState('');
//   let [fontsLoaded, fontError] = useFonts({ Montserrat_700Bold });

//   const fadeAnim = useState(new Animated.Value(0))[0];  // Initial value for opacity: 0

//   React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       }
//     ).start();
//   }, [fadeAnim]);

//   const login = () => {
//     fetch('https://hophacks2023-w74ytc52eq-uc.a.run.app/login/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ nurseID, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           // Alert.alert('Success', data.message);
//           navigation.navigate('IntroVideo');
//           // navigation.navigate('Home', { nurseName: 'John Doe', nurseID: '12345' });
//         } else {
//           Alert.alert('Failed', 'Invalid credentials');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   if (!fontsLoaded && !fontError) {
//     return null;
//   }

//   return (
//     <LinearGradient colors={['#989EF8', '#D0D7FF']} style={styles.container}>
//       <Text style={styles.header}>SugarGuardians</Text>
//       <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
//         <Image style={styles.icon} source={require('../email.png')}/>
//         <TextInput
//           onChangeText={setNurseID}
//           value={nurseID}
//           inputMode="text"
//           style={styles.input}
//           placeholder="Nurse ID"
//         />
//       </Animated.View>
//       <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
//         <Image style={styles.icon} source={require('../password.png')} />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           onChangeText={setPassword}
//           value={password}
//           inputMode="text"
//           secureTextEntry
//         />
//       </Animated.View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={login}>
//           <Text style={styles.buttonText}>Submit</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity>
//         <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
//           Don't have an account? Sign up!
//         </Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   header: {
//     fontSize: 44,
//     fontFamily: 'Montserrat_700Bold',
//     textAlign: 'center',
//     paddingBottom: 50,
//     color: '#000',
//   },
//   icon: {
//     height: 30,  // Specify a height for your icons
//     width: 30,
//     marginRight: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderRadius: 20,
//     paddingTop: 5,
//     paddingBottom: 5,
//     paddingLeft: 10,
//     paddingRight: 10,
//     marginBottom: 20,
//     width: '70%',
//     backgroundColor: '#CDC8C8',
//   },
//   input: {
//     height: 50,
//     width: 150,
//     borderRadius: 10,
//     fontSize: 24,
//     textAlign: 'left',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     paddingTop: 30,
//   },
//   button: {
//     backgroundColor: '#5116FB',
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     elevation: 3, // For Android shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   linkText: {
//     fontSize: 16,
//     color: '#e3d',
//     textAlign: 'center',
//     marginTop: 24,
//     ...Platform.select({
//       web: { cursor: 'pointer' },
//     }),
//   },
// });

// export default LoginScreen;

