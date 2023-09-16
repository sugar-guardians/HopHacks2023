import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flex: 0.15,
  },
  info: {
    flex: 0.7,
    backgroundColor: 'pink',
  },
  avatar: {
    flex: 0.3,
    backgroundColor: 'orange',
  }
});

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.info} />
      <View style={styles.avatar} />
    </View>
  );
}