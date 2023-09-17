import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format } from 'date-fns';

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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 19,
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

export default function PatientCard({ firstName, lastName, id, room, dob, navigation }) {
  const bday = format(new Date(dob), 'M/d/yyyy');

  return (
    <View style={styles.container}>
       {/* <Image style={styles.avatarWrapper} source={require('../a2.png')}/> */}
      <View style={styles.avatarWrapper}>
        <Icon name="user-circle" size={80} color="#323134" />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{`${lastName}, ${firstName}`}</Text>
        <Text style={styles.text}>{`DOB: ${bday}`}</Text>
        <Text style={styles.text}>{`Room: ${room}`}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Titrate', { id, firstName, lastName, bday, room })}
        >
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}