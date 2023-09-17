import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  welcomeMsg: {
    paddingTop: 70,
    paddingBottom: 50,
    fontSize: 40,
    fontFamily: 'Raleway_700Bold',
    color: 'black',
  },
  button: {
    flex: 0.4,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5116FB',
    justifySelf: 'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default function EmptyPtList({ navigation }){
  let [fontsLoaded, fontError] = useFonts({ Raleway_700Bold });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.welcomeMsg}>Welcome, Binh! You currently don't have any patients on an insulin drip right now.</Text>
      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('StartDrip')}>
        <Text style={styles.buttonText}>Start a gtt!</Text>
      </TouchableOpacity>
    </View>
  );
}
