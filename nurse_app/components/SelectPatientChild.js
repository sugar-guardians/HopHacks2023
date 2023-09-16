import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PatientCard from './PatientCard';


const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 600,
  },
  second: {
    flex: 0.8,
  },
  first: {
    display: 'flex',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    paddingBottom: 10,
    fontStyle: 'italic',
  }
});

export default function SelectPatientChild({ patients }) {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Text style={styles.text}>Select a patient to start the insulin drip:</Text>
      </View>
      <View style={styles.second}>
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
    </View>
  );
}