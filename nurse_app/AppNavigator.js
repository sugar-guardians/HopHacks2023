import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IntroVideoScreen from './screens/IntroVideoScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import StartDrip from './screens/StartDrip';
import Titrate from './screens/Titrate';


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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="StartDrip" component={StartDrip} />
      <Stack.Screen name="Titrate" component={Titrate} />

    </Stack.Navigator>
  );
}

export default AppNavigator;
