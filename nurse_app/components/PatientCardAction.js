import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  smallContainer: {
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
    flex: 0.3,
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textWrapper: {
    flex: 0.65,
    display: 'flex',
    justifyContent: 'flex-start'
  },
});

export default function PatientCard({ firstName, lastName, id, room, dob }) {
  return (
    <View style={styles.smallContainer}>
      <View style={styles.avatarWrapper}>
        <Image source={require('../assets/a1.png')} style={{ width: 120, height: 120 }} />
        {/* <Icon name="user-circle" size={80} color="#323134" /> */}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{`${lastName}, ${firstName}`}</Text>
        <Text style={styles.text}>{`DOB: ${dob}`}</Text>
        <Text style={styles.text}>{`Room: ${room}`}</Text>
      </View>
    </View>
  );
}