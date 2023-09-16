import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingX: 20,
  },
  avatarWrapper: {
    flex: 0.3,
  },
  text: {
    fontSize: 20,
  },
  textWrapper: {

  },
  btnWrapper: {

  },
});

export default function PatientCard({ firstName, lastName, id, room, dob }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper} />
      <View style={styles.textWrapper}>
        <Text>{`${lastName}, ${firstName}`}</Text>
        <Text>{`DOB: ${dob}`}</Text>
        <Text>{`Room: ${room}`}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <Button title="Select" />
      </View>
    </View>
  );
}