import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import EmptyPtList from '../components/EmptyPtList';

function HomeScreen({ route, navigation }) {
  // const { nurseName, nurseID } = route.params;

  return (
    <View style={styles.container}>
      <Header />
      <Main child={<EmptyPtList navigation={navigation} />} />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  welcomeText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00aaff',  // Choose a color for your button
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',  // This is your button text color
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  footerText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default HomeScreen;
