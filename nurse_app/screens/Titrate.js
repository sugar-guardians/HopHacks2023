import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ActionOptionsChild from '../components/ActionOptionsChild'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    alignItems: 'center',
  },
});

export default function Titrate() {
  return (
    <View style={styles.container}>
      <Header />
      <Main child={<ActionOptionsChild />} />
      <Footer />
    </View>
  );
}