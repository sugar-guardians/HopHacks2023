import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flex: 0.15,
    backgroundColor: '#9d9ff9',
  },
  info: {
    flex: 0.6,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  avatarWrapper: {
    flex: 0.4,
    paddingRight: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 20,
  }
});

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.text}>Binh Nguyen</Text>
        <Text style={styles.text}>Unit: 3A</Text>
        <Text style={styles.text}>Registered Nurse</Text>
      </View>
      <View style={styles.avatarWrapper}>
        <Image source={require('../assets/nurse.png')} style={{ width: 100, height: 100 }} />
      </View>
    </View>
  );
}