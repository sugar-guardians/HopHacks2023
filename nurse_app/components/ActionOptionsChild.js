import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import PatientCardAction from './PatientCardAction';
import BGInput from './BGInput';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 600,
  },
  first: {
    flex: 0.35,
  },
  third: {
    display: 'flex',
    flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  button: {
    flex: 0.4,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#323134',
  },
  patientEating: {
    backgroundColor: '#323134',
    justifySelf: 'flex-end',
    flex: 0.5,
    marginRight: 10,
    marginLeft: 20,
  },
  discontinueDrip: {
    borderColor: '#323134',
    borderStyle: 'solid',
    marginLeft: 10,
    marginRight: 20,
    borderWidth: 2,
    justifySelf: 'flex-start',
    flex: 0.5,
  },
});

const dateObj = new Date();
dateObj.setHours(dateObj.getHours() + 1);

export default function ActionOptionsChild({
  id, firstName, lastName, bday, room, navigation
}) {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <PatientCardAction
          firstName={firstName}
          lastName={lastName}
          id={id}
          dob={bday}
          room={room}
          navigation={navigation}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.patientEating]}>
          <Text style={styles.buttonText1}>Patient Eating</Text>
        </TouchableOpacity>
        <View style={[styles.button, styles.discontinueDrip]}>
          <Text style={styles.buttonText2}>Discontinue Drip</Text>
        </View>
      </View>
      <View style={styles.third}>
        <Text style={styles.text}>Your next BG is due at {format(dateObj, 'HH:mm')}</Text>
        <BGInput
          id={id}
          navigation={navigation}
          firstName={firstName}
          lastName={lastName}
          dob={bday}
          room={room}
        />
      </View>
    </View>
  );
}