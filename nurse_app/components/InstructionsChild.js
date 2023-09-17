import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import PatientCardAction from './PatientCardAction';
import * as Notifications from 'expo-notifications';
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: 600,
  },
  first: {
    flex: 0.35,
  },
  second: {
    display: 'flex',
    // flex: 0.4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  third: {
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
  }
});

const newBG = 479
const dateTime = "9/16/2023 @ 17:40"
const newRate = 255

export default function InstructionsChild() {
  useEffect(() => {
    const timer = setInterval(() => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder",
          body: "Check sugar level",
        },
        trigger: null,
      });
      navigation.goBack();
    }, 20000);

    return () => {
      clearInterval(timer);
    };
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <PatientCardAction
          firstName="John"
          lastName="Smith"
          id="0184329234"
          dob="07/25/1963"
          room="14B"
        />
      </View>
      <View style={styles.second}>
        <Text style={styles.text1}>BG value of <Text style={styles.emphasis}>{newBG}</Text> recorded for {dateTime}.</Text>
        <Text style={styles.text1}>Your new titration rate is: <Text style={styles.emphasis}>{newRate}</Text> mL/hr.</Text>
      </View>
      <View style={styles.third}>
        <Text style={styles.text2}>-1H BG: 376</Text>
        <Text style={styles.text2}>-1H Titration rate: 289 mL/hr</Text>
      </View>
    </View>
  );
}