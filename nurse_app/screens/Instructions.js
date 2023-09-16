import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import InstructionsChild from '../components/InstructionsChild'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function Instructions() {
  return (
    <View style={styles.container}>
      <Header />
      <Main child={<InstructionsChild />} />
      <Footer />
    </View>
  );
}