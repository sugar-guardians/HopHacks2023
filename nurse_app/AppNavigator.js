import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroVideoScreen from './screens/IntroVideoScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import TestPage from './screens/TestPage';

import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{  headerShown: false}}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="IntroVideo" component={IntroVideoScreen} />
      <Stack.Screen name="Test" component={TestPage} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
