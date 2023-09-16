import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
<<<<<<< HEAD
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
import TestPage from './screens/TestPage';

=======
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
>>>>>>> 5a16a2c45b814f1e104aa8effdefbdc36a4136e9
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
<<<<<<< HEAD
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} /> */}
      <Stack.Screen name="Test" component={TestPage} />
=======
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
>>>>>>> 5a16a2c45b814f1e104aa8effdefbdc36a4136e9
    </Stack.Navigator>
  );
}

export default AppNavigator;
