import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatarWrapper: {
    flex: 0.25,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textWrapper: {
    flex: 0.45,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    flex: 0.25,
    display: 'flex',
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: '#5116FB',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
      {/* <View style={styles.btnWrapper}>
        <Button title="Select" />
      </View> */}
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}