import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'teal',
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatarWrapper: {
    flex: 0.25,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textWrapper: {
    flex: 0.5,
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flex: 0.3
  },
});

export default function PatientCard({ firstName, lastName, id, room, dob }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Icon name="user-circle" size={80} color="#323134" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{`${lastName}, ${firstName}`}</Text>
        <Text style={styles.text}>{`DOB: ${dob}`}</Text>
        <Text style={styles.text}>{`Room: ${room}`}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <Button title="Select" />
      </View>
    </View>
  );
}