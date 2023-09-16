import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
import StartDrip from './screens/StartDrip';
import Titrate from './screens/Titrate';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} /> */}
      {/* <Stack.Screen name="StartDrip" component={StartDrip} /> */}
      <Stack.Screen name="Titrate" component={Titrate} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
