// import React, { useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PatientCard from './PatientCard';
// import * as Notifications from 'expo-notifications';


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

export default function SelectPatientChild({ patients, navigation }) {
    // useEffect(() => {
  //   async function requestPermissions() {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('No notification permissions. You will not be notified!');
  //       return;
  //     }
  //   }
  //   requestPermissions();
  // }, []);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "Reminder",
  //         body: "Check sugar level",
  //       },
  //       trigger: null,
  //     });
  //     console.log('yo timer');
  //     // navigation.goBack();
  //   }, 20000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // });
  // useEffect(() => {
  //   async function sendTestNotification() {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "Test",
  //         body: "Notification test",
  //       },
  //       trigger: null,
  //     });
  //   }

  //   sendTestNotification();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <Text style={styles.text}>Select a patient to start the insulin drip:</Text>
      </View>
      <View style={styles.second}>
        {patients.map(({
          first_name: firstName, last_name: lastName, patient_id: id, room_no: room, date_of_birth: dob
        }) => (
          <PatientCard
            key={id}
            firstName={firstName}
            lastName={lastName}
            id={id}
            room={room}
            dob={dob}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
}