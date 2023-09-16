import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PatientCard from './PatientCard';
import BGInput from './BGInput';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 600,
  },
  first: {
    flex: 0.33,
    backgroundColor: "green",
  },
  second: {
    display: 'flex',
    flex: 0.33,
    backgroundColor: "tomato",
    justifyContent: 'center',
    alignItems: 'center',
  },
  third: {
    flex: 0.33,
    backgroundColor: "teal",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default function ActionOptionsChild() {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <PatientCard
          firstName="John"
          lastName="Smith"
          id="0184329234"
          dob="07/25/1963"
          room="14B"
        />
      </View>
      <View style={styles.second}>
        <BGInput id="0184329234" />
      </View>
      <View style={styles.third}>
        <Button title="Patient eating" />
        <Button title="Discontinue drip" />
      </View>
    </View>
  );
}