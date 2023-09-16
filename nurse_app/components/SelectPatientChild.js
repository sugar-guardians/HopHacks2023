import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PatientCard from './PatientCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 300,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic',
  }
});

export default function SelectPatientChild({ patients }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a patient to start the insulin drip.</Text>
      {patients.map(({firstName, lastName, id, room, dob }) => (
        <PatientCard
          key={id}
          firstName={firstName}
          lastName={lastName}
          id={id}
          room={room}
          dob={dob}
        />
      ))}
    </View>
  );
}