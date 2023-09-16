import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import PatientCard from './PatientCard';
import BGInput from './BGInput';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 600,
  },
  first: {
    flex: 0.33,
    // backgroundColor: "green",
  },
  second: {
    display: 'flex',
    flex: 0.33,
    // backgroundColor: "tomato",
    justifyContent: 'center',
    alignItems: 'center',
  },
  // third: {
  //   flex: 0.33,
  //   // backgroundColor: "teal",
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  text: {
    fontSize: 18,
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flex: 0.33,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#323134',
  },
  patientEating: {
    backgroundColor: '#323134', // Blue
    marginRight: 10,
  },
  discontinueDrip: {
    borderColor: '#323134',
    borderStyle: 'solid',
    marginLeft: 10,
    borderWidth: 2,
  },
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
        <Text style={styles.text}>Your next BG is due at 14:40.</Text>
        <BGInput id="0184329234" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.patientEating]}>
          <Text style={styles.buttonText1}>Patient Eating</Text>
        </TouchableOpacity>
        <View style={[styles.button, styles.discontinueDrip]}>
          <Text style={styles.buttonText2}>Discontinue Drip</Text>
        </View>
      </View>
    </View>
  );
}