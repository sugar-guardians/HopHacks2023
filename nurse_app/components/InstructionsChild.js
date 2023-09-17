import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import PatientCardAction from './PatientCardAction';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 800,
  },
  first: {
    flex: 0.35,
  },
  second: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 40,
  },
  third: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  fourth: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  text1: {
    fontSize: 22,
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  text2: {
    fontSize: 18,
  },
  emphasis: {
    color: 'red',
  },
  emphasisWrapper: {
    backgroundColor: '#5116FB',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 30,
  },
  strongEmphasis: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonWrapper: {
    paddingTop: 100,
    display: 'flex',
    alignItems: 'center',
  },
  buttonInnerWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
    backgroundColor: '#323134',
  },
  button: {
    fontSize: 20,
    color: 'white',
  }
});

const dateTime = format(new Date(), 'M/d/yyyy @ HH:mm');

export default function InstructionsChild({
  navigation, rate, prevRate, currBg, prevBg, d50w, action,
  id, firstName, lastName, room, dob,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <PatientCardAction
          firstName={firstName}
          lastName={lastName}
          id={id}
          dob={dob}
          room={room}
        />
      </View>
      <View style={styles.second}>
        <Text style={styles.text1}>Your new titration rate (mL/hr) is&nbsp;</Text>
        <View style={styles.emphasisWrapper}>
          <Text style={styles.strongEmphasis}>{rate}</Text>
        </View>
      </View>
      <View style={styles.third}>
        <Text style={styles.text1}>BG value of&nbsp;
        <Text style={styles.emphasis}>{currBg}</Text> recorded for {dateTime}.</Text>
      </View>
      {prevBg && prevRate && (
        <View style={styles.fourth}>
          <Text style={styles.text2}>-1H BG: {prevBg}</Text>
          <Text style={styles.text2}>-1H Titration rate: {prevRate} mL/hr</Text>
        </View>
      )}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonInnerWrapper}
          onPress={() => navigation.navigate("Titrate", {
            id, firstName, lastName, bday: dob, room
          })}
        >
          <Text style={styles.button}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}