import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flex: 0.15,
  },
  info: {
    flex: 0.6,
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  avatar: {
    flex: 0.4,
    backgroundColor: 'red',
    paddingRight: 30,
  },
  text: {
    fontSize: 20,
  },
  image: {
    objectFit: 'contain',
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
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg' }}
        />
      </View>
    </View>
  );
}